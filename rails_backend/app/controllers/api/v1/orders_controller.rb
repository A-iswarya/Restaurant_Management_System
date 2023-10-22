# frozen_string_literal: true

module Api
  module V1
    # Order controller
    class OrdersController < ApplicationController
      before_action :find_staff, only: %i[show update destroy]
      before_action :check_staff

      def index
        @orders = Order.all
        @orders = @orders.where(staff_id: params[:staff_id]) if params[:staff_id].present?
        render json: @orders
      end

      def show
        render json: @order
      end

      def create
        @order = Order.new(order_params)
        ActiveRecord::Base.transaction do
          if @order.save
            params[:menus].each do |menu|
              @order.menu_orders.create(menu_id: menu[:menu_id], quantity: menu[:quantity])
            end
            params[:tables].each do |table|
              @order.order_tables.create(table_id: table[:table_id])
            end
            render json: { message: 'Order created successfully', data: @order }
          else
            render json: { error: @order.errors.full_messages.join(', ') }, status: :unauthorized
          end
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @order
          @order.update(order_params)
          render json: { message: 'Order updated successfully', data: @order }
        else
          render json: { error: 'Order is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @order
          @order.destroy
          render json: { message: 'Order destroyed successfully' }
        else
          render json: { error: 'Order is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def order_params
        params.permit(:status, :staff_id, :menus, :tables)
      end

      def find_order
        @order = Order.find_by_id(params[:id])
      end

      def check_staff
        render json: { message: 'Please login as a Staff'} unless @current_user.is_a?(Staff)
      end
    end
  end
end

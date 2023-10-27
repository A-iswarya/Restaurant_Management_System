# frozen_string_literal: true

module Api
  module V1
    # Menu controller
    class MenusController < ApplicationController
      before_action :find_menu, only: %i[show update destroy]
      # before_action :check_admin
      def index
        @menus = Menu.all
        @menus = @menus.where(restaurant_id: params[:restaurant_id]) if params[:restaurant_id].present?
        @menus = @menus.where(staff_id: params[:staff_id]) if params[:staff_id].present?
        render json: @menus
      end

      def show
        render json: @menu
      end

      def create
        @menu = Menu.new(menu_params)
        if @menu.save
          render json: { message: 'Menu created successfully', data: @menu}
        else
          render json: { error: @menu.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @menu
          @menu.update(menu_params)
          render json: { message: 'Menu updated successfully', data: @menu }
        else
          render json: { error: 'Menu is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @menu
          @menu.destroy
          render json:  { message: 'Menu destroyed successfully' }
        else
          render json: { error: 'Menu is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def menu_params
        params.permit(:cooking_time, :description, :name, :price, :restaurant_id, :staff_id)
      end

      def find_menu
        @menu = Menu.find_by_id(params[:id])
      end

      # def check_admin
      #   render json: { message: 'Please login as an Admin'} unless @current_user.is_a?(Admin)
      # end
    end
  end
end

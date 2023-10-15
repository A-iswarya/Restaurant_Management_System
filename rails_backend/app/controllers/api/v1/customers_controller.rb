# frozen_string_literal: true

module Api
  module V1
    # Customer controller
    class CustomersController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]
      before_action :find_customer, only: %i[show update destroy]

      def index
        @customers = Customer.all
        @customers = @customers.where(table_id: params[:table_id]) if params[:table_id].present?
        render json: @customers
      end

      def show
        render json: @customer
      end

      def create
        @customer = Customer.new(customer_params)
        if @customer.save
          generate_token
          render json: { message: 'Customer created successfully', data: @customer, token: @token, user_type: 'Customer' }
        else
          render json: { error: @customer.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @customer
          @customer.update(customer_params)
          render json: { message: 'Customer updated successfully', data: @customer }
        else
          render json: { error: 'Customer is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @customer
          @customer.destroy
          render json: { message: 'Customer destroyed successfully' }
        else
          render json: { error: 'Customer is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def customer_params
        params.permit(:name, :username, :email, :phone_number, :password, :table_id)
      end

      def find_customer
        @customer = Customer.find_by_id(params[:id])
      end

      def generate_token
        expiry_time = (Time.now + 24.hours.to_i).strftime('%m-%d-%Y %H:%M')
        @token = jwt_encode(user_id: @customer.id, user_type: 'Customer', expiry_time: expiry_time)
      end
    end
  end
end

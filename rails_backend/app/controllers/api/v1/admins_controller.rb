# frozen_string_literal: true

module Api
  module V1
    # Admin controller
    class AdminsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]
      before_action :find_admin, only: %i[show update destroy]
      def index
        @admins = Admin.all
        render json: @admins
      end

      def show
        render json: @admin
      end

      def create
        @admin = Admin.new(admin_params)
        if @admin.save
          generate_token
          render json: { message: 'Admin created successfully', data: @admin, token: @token,
                         expiry_time: @expiry_time, user_type: 'Admin' }
        else
          render json: { error: @admin.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @admin
          @admin.update(admin_params)
          render json:  { message: 'Admin updated successfully', data: @admin }
        else
          render json: { error: 'Admin is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @admin
          @admin.destroy
          render json:  { message: 'Admin destroyed successfully' }
        else
          render json: { error: 'Admin is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def admin_params
        params.require(:admin).permit(:username, :email, :phone_number, :password, :restaurant_id)
      end

      def find_admin
        @admin = Admin.find_by_id(params[:id])
      end

      def generate_token
        @token = jwt_encode(user_id: @admin.id, user_type: 'Admin')
        @expiry_time = (Time.now + 24.hours.to_i).strftime('%m-%d-%Y %H:%M')
      end
    end
  end
end

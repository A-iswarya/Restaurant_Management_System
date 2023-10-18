# frozen_string_literal: true

module Api
  module V1
    # Staff controller
    class StaffsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]
      before_action :find_staff, only: %i[show update destroy]
      def index
        @staffs = Staff.all
        @staffs = @staffs.where(restaurant_id: params[:restaurant_id]) if params[:restaurant_id].present?
        @staffs = @staffs.chefs if params[:chef].present?
        render json: @staffs
      end

      def show
        render json: @staff
      end

      def create
        @staff = Staff.new(staff_params)
        if @staff.save
          generate_token
          render json: { message: 'Staff created successfully', data: @staff, token: @token, user_type: 'Staff' }
        else
          render json: { error: @staff.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @staff
          @staff.update(staff_params)
          render json: { message: 'Staff updated successfully', data: @staff }
        else
          render json: { error: 'Staff is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @staff
          @staff.destroy
          render json: { message: 'Staff destroyed successfully' }
        else
          render json: { error: 'Staff is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def staff_params
        params.permit(:name, :username, :email, :phone_number, :password, :designation, :restaurant_id)
      end

      def find_staff
        @staff = Staff.find_by_id(params[:id])
      end

      def generate_token
        expiry_time = (Time.now + 24.hours.to_i).strftime('%m-%d-%Y %H:%M')
        @token = jwt_encode(user_id: @staff.id, user_type: 'Staff', expiry_time: expiry_time)
      end
    end
  end
end

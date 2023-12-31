# frozen_string_literal: true

module Api
  module V1
    # Restaurant controller
    class RestaurantsController < ApplicationController
      skip_before_action :authenticate_user, only: %i[index create]
      before_action :find_restaurant, only: %i[show update destroy]
      before_action :check_admin, only: %i[show update destroy]

      def index
        @restaurants = Restaurant.all
        render json: @restaurants
      end

      def show
        render json: @restaurant
      end

      def create
        @restaurant = Restaurant.new(restaurant_params)
        if @restaurant.save
          render json: { message: 'Restaurant created successfully', data: @restaurant }
        else
          render json: { error: 'Restaurant creation failed' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @restaurant
          @restaurant.update(restaurant_params)
          render json:  { message: 'Restaurant updated successfully', data: @restaurant }
        else
          render json: { error: 'Restaurant is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @restaurant
          @restaurant.destroy
          render json:  { message: 'Restaurant destroyed successfully' }
        else
          render json: { error: 'Restaurant is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def restaurant_params
        params.permit(:name, :city, :email, :phone_number)
      end

      def find_restaurant
        @restaurant = Restaurant.find_by_id(params[:id])
      end

      def check_admin
        render json: { message: 'Please login as an Admin'} unless @current_user.is_a?(Admin)
      end
    end
  end
end

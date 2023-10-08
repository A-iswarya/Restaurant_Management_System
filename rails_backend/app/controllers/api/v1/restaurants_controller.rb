class Api::V1::RestaurantsController < ApplicationController
  before_action :find_restaurant, only: %i[show update destroy]
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
    rescue => e
      render json: { error: e.message }, status: :unauthorized
    end
  
    def update
      if @restaurant
        @restaurant.update(restaurant_params)
        render json:  { message: 'Restaurant updated successfully', data: @restaurant }
      else
        render json: { error: 'Restaurant is not found' }, status: :unauthorized
      end
    rescue => e
      render json: { error: e.message }, status: :unauthorized
    end

    def destroy
      if @restaurant
        @restaurant.destroy
        render json:  { message: 'Restaurant destroyed successfully' }
      else
        render json: { error: 'Restaurant is not found' }, status: :unauthorized
      end
    rescue => e
      render json: { error: e.message }, status: :unauthorized
    end
    
    private
    
    def restaurant_params
      params.require(:restaurant).permit(:name, :city, :email, :phone_number)
    end

    def find_restaurant
      @restaurant = Restaurant.find_by_id(params[:id])
    end
end

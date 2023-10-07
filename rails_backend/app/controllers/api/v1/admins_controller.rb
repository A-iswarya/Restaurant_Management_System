class Api::V1::AdminsController < ApplicationController
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
        render json: { message: 'Admin created successfully', data: @admin }
      else
        render json: { error: 'Admin creation failed' }, status: 400
      end
    rescue => e
      render json: { error: e.message }, status: 400
    end

    def update
      if @admin
        @admin.update(admin_params)
        render json:  { message: 'Admin updated successfully', data: @admin }
      else
        render json: { error: 'Admin is not found' }, status: 400
      end
    rescue => e
      render json: { error: e.message }, status: 400
    end

    def destroy
      if @admin
        @admin.destroy
        render json:  { message: 'Admin destroyed successfully' }
      else
        render json: { error: 'Admin is not found' }, status: 400
      end
    rescue => e
      render json: { error: e.message }, status: 400
    end

    private

    def admin_params
      params.require(:admin).permit(:name, :username, :email, :phone_number, :password, :restaurant_id)
    end

    def find_admin
      @admin = Admin.find_by_id(params[:id])
    end
end

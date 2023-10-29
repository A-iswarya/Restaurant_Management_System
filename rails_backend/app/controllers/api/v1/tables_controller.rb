# frozen_string_literal: true

module Api
  module V1
    # Table controller
    class TablesController < ApplicationController
      before_action :find_table, only: %i[show update destroy update_status]
      def index
        @tables = Table.all
        @tables = @tables.where(restaurant_id: params[:restaurant_id]) if params[:restaurant_id].present?
        @tables = @tables.where(staff_id: params[:staff_id]) if params[:staff_id].present?
        render json: @tables
      end

      def show
        render json: @table
      end

      def create
        @table = Table.new(table_params)
        if @table.save
          render json: { message: 'Table created successfully', data: @table}
        else
          render json: { error: @table.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @table
          @table.update(table_params)
          render json: { message: 'Table updated successfully', data: @table }
        else
          render json: { error: 'Table is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update_status
        if @table
          @table.update_column(:status, params[:status])
          render json: { message: 'Table status updated successfully', data: @table }
        else
          render json: { error: 'Table is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @table
          @table.destroy
          render json:  { message: 'Table destroyed successfully' }
        else
          render json: { error: 'Table is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def table_params
        params.permit(:table_number, :no_of_seats, :restaurant_id, :staff_id)
      end

      def find_table
        @table = Table.find_by_id(params[:id])
      end
    end
  end
end

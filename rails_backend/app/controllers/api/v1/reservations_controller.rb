# frozen_string_literal: true

module Api
  module V1
    # Reservation controller
    class ReservationsController < ApplicationController
      before_action :find_reservation, only: %i[show update destroy]
      before_action :check_customer

      def index
        @reservations = Reservation.all
        @reservations = @reservations.where(customer_id: params[:customer_id]) if params[:customer_id].present?
        @reservations = @reservations.where(table_id: params[:table_id]) if params[:table_id].present?
        render json: @reservations
      end

      def show
        render json: @reservation
      end

      def create
        @reservation = Reservation.new(reservation_params)
        if @reservation.save
          render json: { message: 'Reservation created successfully', data: @reservation }
        else
          render json: { error: @reservation.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @reservation
          @reservation.update(reservation_params)
          render json: { message: 'Reservation updated successfully', data: @reservation }
        else
          render json: { error: 'Reservation is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @reservation
          @reservation.destroy
          render json: { message: 'Reservation destroyed successfully' }
        else
          render json: { error: 'Reservation is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def reservation_params
        params.permit(:time, :customer_id, :table_id)
      end

      def find_reservation
        @reservation = Reservation.find_by_id(params[:id])
      end

      def check_customer
        render json: { message: 'Please login as a Customer' } unless @current_user.is_a?(Customer)
      end
    end
  end
end

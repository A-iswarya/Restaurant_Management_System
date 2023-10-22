# frozen_string_literal: true

module Api
  module V1
    # Feedback controller
    class FeedbacksController < ApplicationController
      before_action :find_feedback, only: %i[show update destroy]
      before_action :check_customer

      def index
        @feedbacks = Feedback.all
        @feedbacks = @feedbacks.where(customer_id: params[:customer_id]) if params[:customer_id].present?
        @feedbacks = @feedbacks.where(restaurant_id: params[:restaurant_id]) if params[:restaurant_id].present?
        render json: @feedbacks
      end

      def show
        render json: @feedback
      end

      def create
        @feedback = Feedback.new(feedback_params)
        if @feedback.save
          render json: { message: 'Feedback created successfully', data: @feedback }
        else
          render json: { error: @feedback.errors.full_messages.join(', ') }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def update
        if @feedback
          @feedback.update(feedback_params)
          render json: { message: 'Feedback updated successfully', data: @feedback }
        else
          render json: { error: 'Feedback is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def destroy
        if @feedback
          @feedback.destroy
          render json: { message: 'Feedback destroyed successfully' }
        else
          render json: { error: 'Feedback is not found' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def feedback_params
        params.permit(:text, :customer_id, :restaurant_id)
      end

      def find_feedback
        @feedback = Feedback.find_by_id(params[:id])
      end

      def check_customer
        render json: { message: 'Please login as a Customer' } unless @current_user.is_a?(Customer)
      end
    end
  end
end

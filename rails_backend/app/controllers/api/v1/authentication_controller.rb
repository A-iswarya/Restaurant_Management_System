# frozen_string_literal: true

module Api
  module V1
    # Authentication controller
    class AuthenticationController < ApplicationController
      skip_before_action :authenticate_user

      def login
        @params = params
        @user = @params[:user_type].constantize.find_by_username(@params[:username])
        if valid_login?
          generate_token
          render_successful_login
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def generate_token
        expiry_time = (Time.now + 24.hours.to_i).strftime('%m-%d-%Y %H:%M')
        @token = jwt_encode({ user_id: @user.id, user_type: @params[:user_type], expiry_time: expiry_time })
      end

      def valid_login?
        @user.present? && @user.restaurant_id == @params[:restaurant_id] && @user.authenticate(@params[:password])
      end

      def render_successful_login
        render json: { token: @token, data: @user, user_type: @params[:user_type] }
      end
    end
  end
end

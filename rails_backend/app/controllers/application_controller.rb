# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::API
  include JwtToken

  before_action :authenticate_user

  private

  def authenticate_user
    header = request.headers['Authorization']
    parsed_header = JSON.parse(header)
    token = JSON.parse(parsed_header['token'])
    expiry_date = DateTime.strptime(JSON.parse(parsed_header['expiry_date']), '%m-%d-%Y %H:%M')
    raise StandardError if expiry_date < Time.now

    @decoded = jwt_decode(token)
    @current_user_type = @decoded[:user_type]
    @current_user = @current_user_type.constantize.find(@decoded[:user_id])
  rescue StandardError => e
    render json: { error: e.message }, status: :unauthorized
  end
end

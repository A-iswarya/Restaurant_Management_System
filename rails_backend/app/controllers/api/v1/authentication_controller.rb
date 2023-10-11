class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_user

  def login
    @user = params[:user_type].constantize.find_by_username(params[:username])
    if @user.authenticate(params[:password])
      token = jwt_encode(user_id: @user.id, user_type: params[:user_type] )
      time = Time.now+24.hours.to_i
      render json: { token: token,
                     expiry_date: time.strftime("%m-%d-%Y %H:%M"),
                     user: @user }
    else
      render json: {error: 'Unauthorized'}, status: :unauthorized
    end
  rescue => e
    render json: { error: e.message }, status: :unauthorized
  end
end

# frozen_string_literal: true

# == Schema Information
#
# Table name: restaurants
#
#  id           :uuid             not null, primary key
#  city         :string
#  email        :string
#  name         :string
#  phone_number :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Restaurant < ApplicationRecord
  has_one :admin
  has_many :menus
  has_many :restaurant_customers, dependent: :destroy
  has_many :customers, through: :restaurant_customers
  has_many :feedbacks, dependent: :destroy
end

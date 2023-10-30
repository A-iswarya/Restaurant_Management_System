# == Schema Information
#
# Table name: customers
#
#  id              :uuid             not null, primary key
#  email           :string
#  name            :string
#  password_digest :string           not null
#  phone_number    :string
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Customer < ApplicationRecord
  has_secure_password
  belongs_to :table, optional: true
  has_many :restaurant_customers, dependent: :destroy
  has_many :restaurants, through: :restaurant_customers
  has_many :feedbacks, dependent: :destroy
  has_many :reservations, dependent: :destroy
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end

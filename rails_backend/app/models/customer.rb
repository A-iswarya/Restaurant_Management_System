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
#  table_id        :uuid
#
# Indexes
#
#  index_customers_on_table_id  (table_id)
#
# Foreign Keys
#
#  fk_rails_...  (table_id => tables.id)
#
class Customer < ApplicationRecord
  has_secure_password
  belongs_to :table, optional: true
  has_many :restaurant_customers, dependent: :destroy
  has_many :restaurants, through: :restaurant_customers
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end

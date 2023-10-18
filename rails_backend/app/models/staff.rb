# == Schema Information
#
# Table name: staffs
#
#  id              :uuid             not null, primary key
#  designation     :integer          not null
#  email           :string
#  name            :string           not null
#  password_digest :string           not null
#  phone_number    :string
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  restaurant_id   :uuid             not null
#
# Indexes
#
#  index_staffs_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  fk_rails_...  (restaurant_id => restaurants.id)
#
class Staff < ApplicationRecord
  has_secure_password
  belongs_to :restaurant
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  scope :chefs, -> { where(designation: 'chef') }
  enum designation: %i[waitstaff chef]
end

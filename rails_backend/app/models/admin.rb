# == Schema Information
#
# Table name: admins
#
#  id            :uuid             not null, primary key
#  email         :string
#  password      :string           not null
#  phone_number  :string
#  username      :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  restaurant_id :uuid             not null
#
# Indexes
#
#  index_admins_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  fk_rails_...  (restaurant_id => restaurants.id)
#
class Admin < ApplicationRecord
  belongs_to :restaurant
  validates :username, presence: true, uniqueness: true
end

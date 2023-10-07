# == Schema Information
#
# Table name: admins
#
#  id            :uuid             not null, primary key
#  email         :string
#  name          :string
#  password      :string
#  phone_number  :string
#  username      :string
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
end

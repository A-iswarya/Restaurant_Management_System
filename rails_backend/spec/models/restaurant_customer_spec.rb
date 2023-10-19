# == Schema Information
#
# Table name: restaurant_customers
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  customer_id   :uuid             not null
#  restaurant_id :uuid             not null
#
# Indexes
#
#  index_restaurant_customers_on_customer_id    (customer_id)
#  index_restaurant_customers_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (restaurant_id => restaurants.id)
#
require 'rails_helper'

RSpec.describe RestaurantCustomer, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

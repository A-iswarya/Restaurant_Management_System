# == Schema Information
#
# Table name: feedbacks
#
#  id            :uuid             not null, primary key
#  text          :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  customer_id   :uuid             not null
#  restaurant_id :uuid             not null
#
# Indexes
#
#  index_feedbacks_on_customer_id    (customer_id)
#  index_feedbacks_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (restaurant_id => restaurants.id)
#
require 'rails_helper'

RSpec.describe Feedback, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

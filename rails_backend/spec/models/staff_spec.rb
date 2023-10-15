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
require 'rails_helper'

RSpec.describe Staff, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

# == Schema Information
#
# Table name: tables
#
#  id            :uuid             not null, primary key
#  no_of_seats   :integer
#  status        :integer          default("free")
#  table_number  :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  restaurant_id :uuid             not null
#  staff_id      :uuid             not null
#
# Indexes
#
#  index_tables_on_restaurant_id  (restaurant_id)
#  index_tables_on_staff_id       (staff_id)
#
# Foreign Keys
#
#  fk_rails_...  (restaurant_id => restaurants.id)
#  fk_rails_...  (staff_id => staffs.id)
#
require 'rails_helper'

RSpec.describe Table, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

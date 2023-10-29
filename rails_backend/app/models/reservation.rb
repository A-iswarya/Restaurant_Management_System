# == Schema Information
#
# Table name: reservations
#
#  id          :uuid             not null, primary key
#  time        :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  customer_id :uuid             not null
#  table_id    :uuid             not null
#
# Indexes
#
#  index_reservations_on_customer_id  (customer_id)
#  index_reservations_on_table_id     (table_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (table_id => tables.id)
#
class Reservation < ApplicationRecord
  belongs_to :customer
  belongs_to :table
end

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
  validate :validate_time

  def validate_time
    if time < Time.now + 2.hour
      errors.add(:time, 'must be at least 2 hours in the future')
    end

    conflicting_reservations = Reservation.where(table_id: table_id)
                                          .where('time >= ? AND time <= ?', time - 1.hour, time + 1.hour)
                                          .where.not(id: id)
    if conflicting_reservations.present?
      errors.add(:time, 'conflicting time with another reservation')
    end
  end
end

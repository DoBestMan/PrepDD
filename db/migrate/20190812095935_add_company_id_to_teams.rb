class AddCompanyIdToTeams < ActiveRecord::Migration[5.2]
  change_table :teams do |t|
    t.belongs_to :company
  end
end

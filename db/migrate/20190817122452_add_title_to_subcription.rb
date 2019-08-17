class AddTitleToSubcription < ActiveRecord::Migration[5.2]
  def change
    change_table :subscriptions do |t|
      t.string :name
    end
  end
end

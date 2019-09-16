class AddCompanyIdToTaskMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :task_messages, :company_id, :bigint
  end
end

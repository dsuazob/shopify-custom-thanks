class AddEmphasisToCustomThank < ActiveRecord::Migration[7.0]
  def change
    add_column :custom_thanks, :emphasis, :integer, default: 0
  end
end

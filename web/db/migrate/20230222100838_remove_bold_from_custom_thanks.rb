class RemoveBoldFromCustomThanks < ActiveRecord::Migration[7.0]
  def change
    remove_column :custom_thanks, :bold, :boolean
  end
end

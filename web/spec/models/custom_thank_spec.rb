require 'rails_helper'

RSpec.describe CustomThank, type: :model do
  it 'has a message' do
    custom_thanks = CustomThank.new(
      message: '',
      emphasis: 'normal'
    )
    expect(custom_thanks).to_not be_valid
    custom_thanks.message = 'Has a thank you message'
    expect(custom_thanks).to be_valid
  end
  
  it 'has an emphasis' do
    custom_thanks = CustomThank.new(
      message: 'Has a thank you message',
      emphasis: ''
    )
    expect(custom_thanks).to_not be_valid
    custom_thanks.emphasis = 'normal'
    expect(custom_thanks).to be_valid
  end
  it 'has a message at least 2 characters long' do
    custom_thanks = CustomThank.new(
      message: '1',
      emphasis: 'normal'
    )
    expect(custom_thanks).to_not be_valid
    custom_thanks.message = '12'
    expect(custom_thanks).to be_valid
  end

  it 'has a message at most 200 characters long' do
    custom_thanks = CustomThank.new(
      message: 'sdgadsfgafhwrthwrhtwterwtyhwrtuwruwruwruwrtuwrujwrtuwuywertuwruietyituioetyuuyerturyuetyiyiuyirtyiteyietyirdtjdryjdrjdfjdfsgjfsdgjsfgjsfgjsfgjsdghjsdfghjsfgjfdjdfjdfjfgjsdfghsdhasdfhsdghsdfhjsdfjsfgjsgj',
      emphasis: 'normal'
    )
    expect(custom_thanks).to_not be_valid
    custom_thanks.message = '12345'
    expect(custom_thanks).to be_valid
  end
end

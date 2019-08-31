# Seeds 
# 1st section --> A single company (Ekta) to test and develop company-specific
# functionality -- eg. Team Mgmt, Company Settings
#
# 2nd section --> Another company (Microsoft) to test and develop basic interactions between
# 2 companies.
#
# 3rd section --> Multiple companies, to test search, features where we'd like a larger number
# of companies to utilize

def company_user_association(user, company, role = 5) 
  RolesUser.create({
    user_id: user.id,
    company_id: company.id,
    role_id: role
  })

  UsersCompany.create({
    user_id: user.id,
    company_id: company.id
  })
end

mark = {
      email: 'mark@ekta.co',
      full_name: 'Mark Franciose',
      password: 'markmarkmark'
}

mark = User.create(mark)

ekta = Company.create({
  name: 'Ekta',
  owner_id: mark.id
})

# mark is owner of Ekta
company_user_association(mark, ekta, 3)

ekta_users = [
  {
    email: 'binbin@ekta.co',
    full_name: 'BinBin He',
    password: 'markmarkmark'
  },
  {
    email: 'dominique@ekta.co',
    full_name: 'Dominique Goncalves',
    password: 'markmarkmark'
  },
  {
    email: 'mel@ekta.co',
    full_name: 'Mel',
    password: 'markmarkmark'
  },
  {
    email: 'alex@ekta.co',
    full_name: 'Alex Maties',
    password: 'markmarkmark'
  },
  {
    email: 'kristen@ekta.co',
    full_name: 'Kristen Madril',
    password: 'markmarkmark'
  },
  {
    email: 'jim@ekta.co',
    full_name: 'Jim Barkley',
    password: 'markmarkmark'
  }
]

ekta_users = User.create(ekta_users)
ekta_users.each do |u|
  company_user_association(u, ekta, 5)
end


## Create a second Company to mock Company-to-Company functionality ##
=begin
microsoft = Company.create({
  name: 'Microsoft'
})
=end


## Create 10 companies, each with 10 users.
=begin
10.times do
  owner_user = User.create({
    full_name: Faker::Name.name,
    email: Faker::Internet.email,
    password: 'password1234'
  })

  company = Company.create({
    name: Faker::Company.name,
    owner_id: owner_user.id
  })

  # setup associations for for owner
  company_user_association(owner_user, company, 3)

  # create 2 manager users
  2.times do
    user = User.create({
      full_name: Faker::Name.name,
      email: Faker::Internet.email,
      password: 'password4321'
    })

    company_user_association(user, company, 4)
  end

  # create 7 users
  7.times do
    user = User.create({
      full_name: Faker::Name.name,
      email: Faker::Internet.email,
      password: 'password7890'
    })

    company_user_association(user, company, 5)
  end

  # create 4 teams
  4.times do
    team = Team.create({
      name: Faker::Sports::Basketball.team,
      company_id: company.id
    })
  end

end
=end

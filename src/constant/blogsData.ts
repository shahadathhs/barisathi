import one from "@/assets/blogs/1.jpg";
import two from "@/assets/blogs/2.jpg";
import three from "@/assets/blogs/3.jpg";
import four from "@/assets/blogs/4.jpg";
import five from "@/assets/blogs/5.jpg";
import six from "@/assets/blogs/6.jpg";

export type Blog = {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  date: string
  author: string
  authorRole: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  category: "tenant" | "landlord" | "general"
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "10 Essential Tips for First-Time Renters",
    slug: "first-time-renter-tips",
    summary: "Navigate your first rental experience with confidence using these essential tips for new tenants.",
    content: `
# 10 Essential Tips for First-Time Renters

Finding and securing your first rental property can be both exciting and overwhelming. As a first-time renter, there are several important factors to consider before signing a lease agreement.

## 1. Understand Your Budget

Before you start your search, calculate how much you can realistically afford to spend on rent. Financial experts recommend that your rent should not exceed 30% of your monthly income. Remember to factor in additional costs such as utilities, internet, and renter's insurance.

## 2. Research the Neighborhood

The location of your rental property is just as important as the property itself. Research the neighborhood to ensure it meets your needs in terms of safety, proximity to work or school, public transportation, and amenities like grocery stores and restaurants.

## 3. Inspect the Property Thoroughly

When viewing a potential rental, inspect it carefully for any existing damage or maintenance issues. Take photos and make notes of anything that needs attention, and discuss these with the landlord before signing the lease.

## 4. Read the Lease Agreement Carefully

Your lease agreement is a legally binding document that outlines your rights and responsibilities as a tenant. Read it thoroughly and seek clarification on any terms you don't understand before signing.

## 5. Understand the Security Deposit Terms

Most landlords require a security deposit to cover potential damages or unpaid rent. Understand the terms for getting your deposit back at the end of your lease, including any deductions that might be made.

## 6. Get Renter's Insurance

While your landlord's insurance covers the building structure, it doesn't protect your personal belongings. Renter's insurance is relatively inexpensive and provides coverage for your possessions in case of theft, fire, or other damages.

## 7. Document the Condition of the Property

Before moving in, document the condition of the property with photos and a written inventory. This will help prevent disputes about damages when you move out.

## 8. Establish Good Communication with Your Landlord

Maintaining open and respectful communication with your landlord can make your rental experience much smoother. Know how to contact them for maintenance issues or emergencies.

## 9. Understand Your Rights as a Tenant

Familiarize yourself with tenant rights in your area. These laws protect you from unfair treatment and outline procedures for issues like evictions and maintenance requests.

## 10. Plan for Renewal or Moving Out

As your lease end date approaches, decide whether you want to renew or move out. If you're planning to leave, understand the notice period required and the process for getting your security deposit back.

By following these tips, you'll be well-prepared for your first rental experience and can focus on enjoying your new home.
    `,
    date: "2023-11-15",
    author: "Sarah Johnson",
    authorRole: "Tenant Advisor",
    image: one,
    category: "tenant",
  },
  {
    id: "2",
    title: "A Landlord's Guide to Property Maintenance",
    slug: "landlord-property-maintenance-guide",
    summary: "Learn effective strategies for maintaining your rental properties and keeping tenants satisfied.",
    content: `
# A Landlord's Guide to Property Maintenance

Effective property maintenance is crucial for landlords who want to protect their investment, keep tenants happy, and avoid costly repairs. This guide outlines key strategies for maintaining your rental properties.

## Preventative Maintenance Schedule

Implementing a preventative maintenance schedule can help you catch small issues before they become major problems. Consider creating a calendar that includes:

- Seasonal HVAC system checks
- Annual roof inspections
- Regular gutter cleaning
- Periodic checks of plumbing systems
- Testing smoke and carbon monoxide detectors
- Pest control treatments

## Responsive Maintenance Procedures

When tenants report issues, having a clear process for addressing them is essential:

1. Establish multiple ways for tenants to report maintenance issues
2. Acknowledge receipt of maintenance requests promptly
3. Prioritize issues based on urgency and safety concerns
4. Communicate timelines for repairs to tenants
5. Follow up after repairs to ensure satisfaction

## Building a Reliable Contractor Network

Develop relationships with reliable contractors for various maintenance needs:

- Licensed plumbers and electricians
- HVAC specialists
- General handymen
- Landscaping services
- Cleaning services
- Emergency repair specialists

Having trusted professionals you can call on short notice will make property management much smoother.

## Tenant Education

Educate your tenants on basic property maintenance and their responsibilities:

- How to use appliances properly
- Basic plumbing maintenance (avoiding clogs, etc.)
- Thermostat operation and energy efficiency
- Reporting maintenance issues promptly
- Lawn care and outdoor maintenance expectations

## Documentation and Record-Keeping

Maintain detailed records of all maintenance activities:

- Keep receipts and invoices for all repairs
- Document the date and nature of all maintenance requests
- Take before and after photos of repair work
- Track maintenance costs for tax purposes
- Use property management software to organize records

## Budgeting for Maintenance

Set aside funds specifically for property maintenance:

- Budget 1-2% of the property value annually for maintenance
- Create separate funds for routine maintenance and capital improvements
- Plan for major replacements (roof, HVAC, appliances) based on expected lifespans

By implementing these maintenance strategies, you'll protect your investment, reduce long-term costs, and create a positive living experience for your tenants.
    `,
    date: "2023-10-22",
    author: "Michael Chen",
    authorRole: "Property Management Specialist",
    image: two,
    category: "landlord",
  },
  {
    id: "3",
    title: "Understanding Rental Housing Regulations",
    slug: "rental-housing-regulations",
    summary: "A comprehensive overview of rental housing regulations that both tenants and landlords should know.",
    content: `
# Understanding Rental Housing Regulations

Navigating the complex landscape of rental housing regulations can be challenging for both landlords and tenants. This guide provides an overview of key regulations that govern rental properties.

## Fair Housing Laws

The Fair Housing Act prohibits discrimination in housing based on:

- Race or color
- National origin
- Religion
- Sex (including gender identity and sexual orientation)
- Familial status
- Disability

Landlords must ensure their tenant selection process, rules, and policies don't discriminate against protected classes.

## Security Deposit Regulations

Security deposit laws vary by location but typically address:

- Maximum deposit amounts (often limited to 1-2 months' rent)
- Deposit storage requirements (some areas require separate interest-bearing accounts)
- Allowable deductions for damages beyond normal wear and tear
- Timelines for returning deposits after lease termination (usually 14-30 days)

## Habitability Standards

Landlords are legally required to maintain properties that meet basic habitability standards:

- Structural integrity and weatherproofing
- Functioning plumbing, electrical, and heating systems
- Clean and sanitary conditions
- Free from pest infestations
- Compliance with building and health codes

## Privacy and Entry Rights

Regulations typically require landlords to:

- Provide advance notice before entering a tenant's unit (usually 24-48 hours)
- Enter only during reasonable hours
- Enter without notice only in genuine emergencies

## Rent Control and Stabilization

Some jurisdictions have rent control or stabilization laws that:

- Limit how much rent can increase annually
- Restrict when landlords can terminate tenancies
- Require just cause for evictions
- Mandate relocation assistance in certain circumstances

## Eviction Procedures

Proper eviction procedures typically include:

- Valid legal grounds for eviction
- Proper written notice with specific time periods
- Court filing and hearing if tenant doesn't vacate
- Enforcement only by law enforcement officials, never self-help evictions

## Lease Agreement Requirements

Legally compliant lease agreements must:

- Clearly state the terms of tenancy
- Include legally required disclosures (lead paint, mold, etc.)
- Not contain unenforceable or illegal provisions
- Be signed by all parties

## Local Ordinances

Many cities and counties have additional regulations regarding:

- Rental property registration and inspection
- Short-term rental restrictions
- Occupancy limits
- Noise and nuisance regulations
- Specific maintenance requirements

Understanding these regulations helps create fair and legally compliant rental relationships. Both landlords and tenants should familiarize themselves with the specific laws in their jurisdiction.
    `,
    date: "2023-09-18",
    author: "Jennifer Martinez",
    authorRole: "Housing Policy Analyst",
    image: three,
    category: "general",
  },
  {
    id: "4",
    title: "How to Create an Effective Rental Listing",
    slug: "effective-rental-listing",
    summary: "Tips for landlords on creating compelling rental listings that attract quality tenants quickly.",
    content: `
# How to Create an Effective Rental Listing

A well-crafted rental listing can significantly reduce vacancy times and help you attract quality tenants. Follow these guidelines to create listings that generate interest and inquiries.

## Compelling Headlines

Your headline should capture attention and highlight the property's most attractive features:

- Include the number of bedrooms and bathrooms
- Mention a standout feature (e.g., "Renovated Kitchen" or "Private Backyard")
- Note the neighborhood or location
- Consider including the rent if it's competitive for the area

Example: "Spacious 2BR/2BA with Modern Kitchen in Downtown - $1,500"

## High-Quality Photography

Photos have the biggest impact on potential tenants' interest:

- Use a wide-angle lens (but avoid fisheye distortion)
- Ensure proper lighting (open curtains, turn on lights)
- Declutter and stage rooms before photographing
- Include photos of all rooms and outdoor spaces
- Lead with the most attractive photos
- Consider virtual tours for premium properties

## Detailed Property Description

Provide comprehensive information about the property:

- Square footage and layout
- Appliances and fixtures included
- Flooring and window treatments
- Storage options
- Parking arrangements
- Outdoor spaces
- Recent renovations or updates
- Utility information (what's included vs. tenant responsibility)

## Highlight Neighborhood Amenities

Help potential tenants envision living in the area:

- Proximity to public transportation
- Nearby shopping, dining, and entertainment
- Parks and recreational facilities
- School district information
- Walk Score or Bike Score if favorable
- Commute times to major employers

## Clear Rental Terms

Be upfront about important policies and requirements:

- Monthly rent and security deposit amount
- Lease length options
- Pet policy (including any restrictions or fees)
- Smoking policy
- Parking arrangements
- Maintenance responsibilities
- Application process and fees
- Required income or credit score

## Call to Action

End with clear instructions on next steps:

- How to schedule a viewing
- Application process details
- Contact information
- Response time expectations

## Listing Distribution

Post your listing on multiple platforms for maximum exposure:

- Popular rental websites
- Social media groups
- Local classifieds
- Your property management website
- Neighborhood bulletin boards

By following these guidelines, you'll create rental listings that stand out from the competition and attract qualified, interested tenants more quickly.
    `,
    date: "2023-08-05",
    author: "Robert Williams",
    authorRole: "Marketing Specialist",
    image:four,
    category: "landlord",
  },
  {
    id: "5",
    title: "Navigating Roommate Relationships in Shared Rentals",
    slug: "roommate-relationships",
    summary:
      "Practical advice for establishing and maintaining healthy roommate relationships in shared rental situations.",
    content: `
# Navigating Roommate Relationships in Shared Rentals

Living with roommates can be a great way to reduce housing costs and build community, but it also comes with unique challenges. This guide offers practical advice for establishing and maintaining healthy roommate relationships.

## Setting Clear Expectations Early

Before moving in together or when welcoming a new roommate:

- Discuss and document expectations about noise, guests, and shared spaces
- Establish cleaning responsibilities and standards
- Agree on how to handle shared expenses and utilities
- Create a process for addressing concerns or conflicts
- Consider creating a formal roommate agreement

## Financial Management

Money issues are among the most common sources of roommate conflict:

- Decide how rent and utilities will be divided (equal splits vs. proportional to room size or income)
- Determine who will be responsible for collecting and submitting payments
- Establish due dates for each roommate's contribution
- Keep records of all payments
- Discuss how shared household items will be purchased and managed
- Consider using roommate expense-sharing apps

## Shared Space Etiquette

Respect for shared living areas is crucial:

- Clean up after yourself in common areas
- Discuss and agree on decoration decisions
- Establish kitchen protocols (labeling food, cleaning dishes)
- Create a fair system for using shared amenities (TV, laundry)
- Respect noise levels, especially during agreed-upon quiet hours
- Provide advance notice for guests, especially overnight visitors

## Communication Strategies

Effective communication prevents many common roommate issues:

- Schedule regular roommate meetings to discuss household matters
- Address small concerns before they become major problems
- Use "I" statements when discussing issues ("I feel..." rather than "You always...")
- Be receptive to feedback and willing to compromise
- Consider creating a shared communication channel (group chat, bulletin board)

## Privacy and Boundaries

Respecting personal boundaries is essential:

- Knock before entering private bedrooms
- Ask before borrowing personal items
- Discuss comfort levels with sharing food, toiletries, etc.
- Establish boundaries regarding significant others in the home
- Respect each other's need for alone time

## Conflict Resolution

When disagreements arise:

- Address issues directly with the relevant roommate(s)
- Focus on specific behaviors rather than personality traits
- Listen actively to understand their perspective
- Work together to find mutually acceptable solutions
- Consider a neutral third party for mediation if needed
- Know when to involve the landlord (only for lease violations or serious issues)

## Building a Positive Household Culture

Beyond conflict avoidance, create a positive living environment:

- Celebrate birthdays and achievements
- Consider occasional roommate meals or activities
- Express appreciation for positive behaviors
- Be flexible and understanding about occasional lapses
- Support each other during difficult times

With thoughtful communication and mutual respect, roommate relationships can evolve into meaningful friendships and create a supportive home environment.
    `,
    date: "2023-07-12",
    author: "Aisha Patel",
    authorRole: "Community Living Specialist",
    image: five,
    category: "tenant",
  },
  {
    id: "6",
    title: "Smart Home Upgrades for Rental Properties",
    slug: "smart-home-rental-upgrades",
    summary:
      "Discover which smart home technologies can increase your rental property's value and appeal to modern tenants.",
    content: `
# Smart Home Upgrades for Rental Properties

Implementing smart home technology in your rental properties can increase their appeal to tech-savvy tenants, potentially command higher rents, and even reduce operating costs. Here's a guide to the most beneficial smart upgrades for landlords.

## Smart Locks and Access Control

Smart locks offer convenience and enhanced security:

- Keyless entry eliminates the need for physical key management
- Temporary access codes for maintenance workers or showings
- Remote locking/unlocking capabilities
- Activity logs to monitor entry
- Integration with property management systems
- Tenant-controlled guest access

Popular options include August, Schlage Encode, and Yale Assure locks.

## Smart Thermostats

Energy-efficient climate control benefits both landlords and tenants:

- Programmable schedules to reduce energy usage when units are unoccupied
- Remote temperature control via smartphone apps
- Learning capabilities that adapt to tenant habits
- Energy usage reports and optimization suggestions
- Potential utility rebates and incentives
- Freeze protection alerts to prevent pipe damage

Nest, Ecobee, and Honeywell Home are leading brands in this category.

## Smart Lighting Systems

Upgraded lighting enhances convenience and efficiency:

- Remote control of lights via smartphone or voice commands
- Scheduling capabilities for security and energy savings
- Dimming features for comfort and reduced electricity usage
- Motion sensors for common areas like hallways and entryways
- Integration with other smart home systems
- Optional color-changing features for tenant customization

Consider Philips Hue, LIFX, or Lutron Caséta systems.

## Water Leak Detection

Prevent costly water damage with smart detection systems:

- Early alert systems for leaks and unusual water usage
- Automatic water shutoff capabilities
- Freeze warnings to prevent pipe bursts
- Integration with property management notification systems
- Historical water usage data
- Potential insurance premium discounts

Flo by Moen, Phyn, and Flume offer comprehensive solutions.

## Smart Security Systems

Enhanced security features attract safety-conscious tenants:

- Smart doorbells with video and two-way communication
- Motion-activated cameras for entry points and common areas
- Mobile alerts for suspicious activity
- Cloud storage of security footage
- Integration with smart locks and lighting
- Optional professional monitoring services

Ring, SimpliSafe, and Arlo are popular choices for rental properties.

## Implementation Considerations

Before installing smart technology:

- Ensure reliable WiFi coverage throughout the property
- Consider who will manage system administration (landlord vs. tenant)
- Create clear policies for data privacy and device ownership
- Develop procedures for transferring control between tenants
- Calculate ROI based on potential rent increases and operational savings
- Check local regulations regarding surveillance and privacy

By strategically implementing these smart home technologies, landlords can create more attractive, efficient, and secure rental properties that appeal to today's tech-savvy renters.
    `,
    date: "2023-06-20",
    author: "David Thompson",
    authorRole: "PropTech Consultant",
    image: six,
    category: "landlord",
  },
]

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug)
}

export function getRecentBlogs(count = 3): Blog[] {
  return [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export function getAllBlogs(): Blog[] {
  return [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogsByCategory(category: Blog["category"]): Blog[] {
  return blogs
    .filter((blog) => blog.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

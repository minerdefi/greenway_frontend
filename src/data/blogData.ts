export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    imageUrl: string;
    tags: string[];
    readTime: number;
}

// Blog posts using existing images from the project
export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Sustainable Logistics: The Future of Shipping",
        slug: "sustainable-logistics-future-shipping",
        excerpt: "How eco-friendly shipping practices are transforming the logistics industry and reducing carbon footprints globally.",
        content: `
      <p>The logistics industry is undergoing a significant transformation as companies worldwide recognize the importance of sustainable practices in their operations. With growing concerns about climate change and environmental impact, businesses are increasingly seeking eco-friendly alternatives for their shipping needs.</p>
      
      <h2>The Rise of Green Logistics</h2>
      <p>Green logistics focuses on measuring and minimizing the environmental impact of logistics activities. This includes reducing emissions, using sustainable materials, and optimizing routes to decrease fuel consumption. At Greenway, we've committed to reducing our carbon footprint by 40% by 2030.</p>
      
      <h2>Benefits of Sustainable Shipping</h2>
      <p>Adopting sustainable logistics practices offers numerous advantages:</p>
      <ul>
        <li>Reduced environmental impact and carbon emissions</li>
        <li>Cost savings through fuel efficiency and reduced waste</li>
        <li>Enhanced brand reputation and customer loyalty</li>
        <li>Compliance with increasing environmental regulations</li>
        <li>Future-proofing against resource scarcity</li>
      </ul>
      
      <h2>Innovations in Eco-Friendly Shipping</h2>
      <p>Several technological advancements are making sustainable logistics more viable:</p>
      <ul>
        <li>Electric and hybrid delivery vehicles</li>
        <li>Alternative fuels like biodiesel and hydrogen</li>
        <li>AI-powered route optimization to reduce fuel consumption</li>
        <li>Sustainable packaging solutions</li>
        <li>Shared logistics networks to maximize efficiency</li>
      </ul>
      
      <p>As we look to the future, sustainable logistics isn't just a trend—it's becoming an essential aspect of doing business responsibly in an increasingly environmentally conscious world.</p>
    `,
        date: "2023-11-15",
        author: "Emma Rodriguez",
        category: "Sustainability",
        imageUrl: "/images/services/short-term-storage.png", // Using existing hero image
        tags: ["sustainability", "shipping", "eco-friendly", "carbon footprint"],
        readTime: 5
    },
    {
        id: "2",
        title: "How Route Optimization Saves Fuel and Reduces Emissions",
        slug: "route-optimization-saves-fuel-reduces-emissions",
        excerpt: "Smart route planning and vehicle efficiency can dramatically cut costs and environmental impact.",
        content: `
      <p>In the transportation and logistics sector, one of the most effective ways to reduce environmental impact is through intelligent route optimization.</p>
      
      <h2>The Power of Smart Routing</h2>
      <p>Route optimization isn't just about finding the shortest path between two points. Modern algorithms consider numerous variables including traffic patterns, vehicle type, load weight, weather conditions, and even driver behavior to determine the most efficient routes.</p>
      
      <h2>Technology Behind Optimization</h2>
      <p>At Greenway, we employ several technological solutions to maximize route efficiency:</p>
      <ul>
        <li>AI and machine learning algorithms that learn and improve over time</li>
        <li>Real-time GPS tracking and traffic integration</li>
        <li>Weather pattern analysis to anticipate delays</li>
        <li>Load optimization to maximize delivery efficiency</li>
      </ul>
      
      <h2>Measurable Results</h2>
      <p>Our clients have seen remarkable improvements after implementing our route optimization solutions:</p>
      <ul>
        <li>15-30% reduction in fuel consumption</li>
        <li>20-40% decrease in carbon emissions</li>
        <li>Increased vehicle lifespan due to optimized usage</li>
        <li>10-25% improvement in on-time deliveries</li>
      </ul>
      
      <p>By integrating these technologies into daily operations, companies can simultaneously reduce their environmental footprint while improving their bottom line—proving that sustainability and profitability can go hand in hand.</p>
    `,
        date: "2023-12-03",
        author: "Michael Chen",
        category: "Technology",
        imageUrl: "/images/services/value-added-services.jpg", // Using existing tracking image
        tags: ["route optimization", "fuel efficiency", "emissions reduction", "technology"],
        readTime: 4
    },
    {
        id: "3",
        title: "Eco-Friendly Packaging Solutions for Modern Businesses",
        slug: "eco-friendly-packaging-solutions-modern-businesses",
        excerpt: "Innovative packaging alternatives that protect products and the planet simultaneously.",
        content: `
      <p>Packaging waste has become one of the most visible environmental challenges, with consumers increasingly demanding sustainable alternatives. Businesses that adapt can gain competitive advantage while contributing to environmental preservation.</p>
      
      <h2>Beyond Traditional Packaging</h2>
      <p>Traditional packaging materials often involve plastics derived from fossil fuels, with long decomposition timelines and harmful environmental impacts. Eco-friendly alternatives are gaining traction due to their reduced environmental footprint and growing consumer preference.</p>
      
      <h2>Innovative Materials Leading the Change</h2>
      <p>Several sustainable packaging materials are proving their effectiveness:</p>
      <ul>
        <li>Biodegradable packing peanuts made from plant starch</li>
        <li>Mushroom packaging that grows into shape around products</li>
        <li>Seaweed-based packaging films that dissolve in water</li>
        <li>Recycled paper and cardboard with water-based inks</li>
        <li>Plant fiber packaging from agricultural waste</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>Transitioning to sustainable packaging requires thoughtful planning:</p>
      <ul>
        <li>Audit current packaging usage and identify opportunities</li>
        <li>Pilot test eco-friendly alternatives for durability and protection</li>
        <li>Communicate changes to customers who increasingly value sustainability</li>
        <li>Analyze lifecycle impacts beyond just biodegradability</li>
      </ul>
      
      <p>At Greenway Logistics, we consult with businesses to develop packaging strategies that protect both products and the planet, ensuring a smooth transition to more sustainable operations.</p>
    `,
        date: "2024-01-18",
        author: "Sophia Williams",
        category: "Sustainability",
        imageUrl: "/images/services/transportation.jpeg", // Using existing services image
        tags: ["packaging", "sustainability", "innovation", "waste reduction"],
        readTime: 6
    }
];

// Get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

// Get related posts based on category and tags (excluding the current post)
export function getRelatedPosts(currentPost: BlogPost, count: number = 2): BlogPost[] {
    return blogPosts
        .filter(post => post.id !== currentPost.id)
        .filter(post =>
            post.category === currentPost.category ||
            post.tags.some(tag => currentPost.tags.includes(tag))
        )
        .slice(0, count);
}

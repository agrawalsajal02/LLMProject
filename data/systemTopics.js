const topics = {
    "Communication protocols": {
        "REST API vs. GraphQL": "#rest-api-vs-graphql",
        "How does gRPC work?": "#how-does-grpc-work",
        "What is a webhook?": "#what-is-a-webhook",
        "How to improve API performance?": "#how-to-improve-api-performance",
        "HTTP 1.0 -> HTTP 1.1 -> HTTP 2.0 -> HTTP 3.0 (QUIC)": "#http-10---http-11---http-20---http-30-quic",
        "SOAP vs REST vs GraphQL vs RPC": "#soap-vs-rest-vs-graphql-vs-rpc",
        "Code First vs. API First": "#code-first-vs-api-first",
        "HTTP status codes": "#http-status-codes",
        "What does API gateway do?": "#what-does-api-gateway-do",
        "How do we design effective and safe APIs?": "#how-do-we-design-effective-and-safe-apis",
        "TCP/IP encapsulation": "#tcpip-encapsulation",
        "Why is Nginx called a “reverse” proxy?": "#why-is-nginx-called-a-reverse-proxy",
        "What are the common load-balancing algorithms?": "#what-are-the-common-load-balancing-algorithms",
        "URL, URI, URN - Do you know the differences?": "#url-uri-urn---do-you-know-the-differences"
    },
    "CI/CD": {
        "CI/CD Pipeline Explained in Simple Terms": "#cicd-pipeline-explained-in-simple-terms",
        "Netflix Tech Stack (CI/CD Pipeline)": "#netflix-tech-stack-cicd-pipeline"
    },
    "Architecture patterns": {
        "MVC, MVP, MVVM, MVVM-C, and VIPER": "#mvc-mvp-mvvm-mvvm-c-and-viper",
        "18 Key Design Patterns Every Developer Should Know": "#18-key-design-patterns-every-developer-should-know"
    }, "Database": {
        "A nice cheat sheet of different databases in cloud services": "#a-nice-cheat-sheet-of-different-databases-in-cloud-services",
        "8 Data Structures That Power Your Databases": "#8-data-structures-that-power-your-databases",
        "How is an SQL statement executed in the database?": "#how-is-an-sql-statement-executed-in-the-database",
        "CAP theorem": "#cap-theorem",
        "Types of Memory and Storage": "#types-of-memory-and-storage",
        "Visualizing a SQL query": "#visualizing-a-sql-query",
        "SQL language": "#sql-language"
    },
    "Cache": {
        "Data is cached everywhere": "#data-is-cached-everywhere",
        "Why is Redis so fast?": "#why-is-redis-so-fast",
        "How can Redis be used?": "#how-can-redis-be-used",
        "Top caching strategies": "#top-caching-strategies"
    },
    "Microservice architecture": {
        "What does a typical microservice architecture look like?": "#what-does-a-typical-microservice-architecture-look-like",
        "Microservice Best Practices": "#microservice-best-practices",
        "What tech stack is commonly used for microservices?": "#what-tech-stack-is-commonly-used-for-microservices",
        "Why is Kafka fast": "#why-is-kafka-fast"
    },
    "Payment systems": {
        "How to learn payment systems?": "#how-to-learn-payment-systems",
        "Why is the credit card called “the most profitable product in banks”? How does VISA/Mastercard make money?": "#why-is-the-credit-card-called-the-most-profitable-product-in-banks-how-does-visamastercard-make-money",
        "How does VISA work when we swipe a credit card at a merchant’s shop?": "#how-does-visa-work-when-we-swipe-a-credit-card-at-a-merchants-shop",
        "Payment Systems Around The World Series (Part 1): Unified Payments Interface (UPI) in India": "#payment-systems-around-the-world-series-part-1-unified-payments-interface-upi-in-india"
    },    "DevOps": {
        "DevOps vs. SRE vs. Platform Engineering. What is the difference?": "#devops-vs-sre-vs-platform-engineering-what-is-the-difference",
        "What is k8s (Kubernetes)?": "#what-is-k8s-kubernetes",
        "Docker vs. Kubernetes. Which one should we use?": "#docker-vs-kubernetes-which-one-should-we-use",
        "How does Docker work?": "#how-does-docker-work"
    },
    "GIT": {
        "How Git Commands work": "#how-git-commands-work",
        "How does Git Work?": "#how-does-git-work",
        "Git merge vs. Git rebase": "#git-merge-vs-git-rebase"
    },
    "Cloud Services": {
        "A nice cheat sheet of different cloud services (2023 edition)": "#a-nice-cheat-sheet-of-different-cloud-services-2023-edition",
        "What is cloud native?": "#what-is-cloud-native"
    },
    "Developer productivity tools": {
        "Visualize JSON files": "#visualize-json-files",
        "Automatically turn code into architecture diagrams": "#automatically-turn-code-into-architecture-diagrams"
    },
    "Linux": {
        "Linux file system explained": "#linux-file-system-explained",
        "18 Most-used Linux Commands You Should Know": "#18-most-used-linux-commands-you-should-know"
    },
    "Security": {
        "How does HTTPS work?": "#how-does-https-work",
        "Oauth 2.0 Explained With Simple Terms.": "#oauth-20-explained-with-simple-terms",
        "Top 4 Forms of Authentication Mechanisms": "#top-4-forms-of-authentication-mechanisms",
        "Session, cookie, JWT, token, SSO, and OAuth 2.0 - what are they?": "#session-cookie-jwt-token-sso-and-oauth-20---what-are-they",
        "How to store passwords safely in the database and how to validate a password?": "#how-to-store-passwords-safely-in-the-database-and-how-to-validate-a-password",
        "Explaining JSON Web Token (JWT) to a 10 year old Kid": "#explaining-json-web-token-jwt-to-a-10-year-old-kid",
        "How does Google Authenticator (or other types of 2-factor authenticators) work?": "#how-does-google-authenticator-or-other-types-of-2-factor-authenticators-work"
    },
    "Real World Case Studies": {
        "Netflix's Tech Stack": "#netflixs-tech-stack",
        "Twitter Architecture 2022": "#twitter-architecture-2022",
        "Evolution of Airbnb’s microservice architecture over the past 15 years": "#evolution-of-airbnbs-microservice-architecture-over-the-past-15-years",
        "Monorepo vs. Microrepo.": "#monorepo-vs-microrepo",
        "How will you design the Stack Overflow website?": "#how-will-you-design-the-stack-overflow-website",
        "Why did Amazon Prime Video monitoring move from serverless to monolithic? How can it save 90% cost?": "#why-did-amazon-prime-video-monitoring-move-from-serverless-to-monolithic-how-can-it-save-90-cost",
        "How does Disney Hotstar capture 5 Billion Emojis during a tournament?": "#how-does-disney-hotstar-capture-5-billion-emojis-during-a-tournament",
        "How Discord Stores Trillions Of Messages": "#how-discord-stores-trillions-of-messages",
        "How do video live streamings work on YouTube, TikTok live, or Twitch?": "#how-do-video-live-streamings-work-on-youtube-tiktok-live-or-twitch"
    }
};
const getRandomDesignTopic = () => {
    const mainTopics = Object.keys(topics);
    const randomMainTopic = mainTopics[Math.floor(Math.random() * mainTopics.length)];
    
    const subTopics = topics[randomMainTopic];
    const subTopicKeys = Object.keys(subTopics);
    const randomSubTopicKey = subTopicKeys[Math.floor(Math.random() * subTopicKeys.length)];
    const randomSubTopicValue = subTopics[randomSubTopicKey];
    
    return {
        mainTopic: randomMainTopic,
        subTopic: randomSubTopicKey,
        url: "https://github.com/ByteByteGoHq/system-design-101/tree/main" + randomSubTopicValue
    };
};

export { getRandomDesignTopic };
import { BookPage, PageType } from './types';

export const AUTHOR_NAME = "Developer Canduri Franklin";
export const BOOK_TITLE = "JAVA GENESIS AI";
export const BOOK_SUBTITLE = "THE ERA OF AUGMENTED DEVELOPMENT";

export const BOOK_PAGES: BookPage[] = [
  {
    id: 1,
    type: PageType.COVER,
    title: BOOK_TITLE,
    subtitle: BOOK_SUBTITLE,
    content: [
      "How Generative AI is redefining productivity, elevating quality, and transforming programmers into architects within the Java ecosystem."
    ],
    visualDescription: "A futuristic AI robot holding a glowing Java crystal",
    imageUrl: "https://picsum.photos/seed/cover/800/800?grayscale",
    links: [
      { title: "Java 21 Features", url: "https://openjdk.org/projects/jdk/21/", type: "DOCS" },
      { title: "Google AI for Developers", url: "https://ai.google.dev/", type: "TOOL" }
    ]
  },
  {
    id: 2,
    type: PageType.CONTENT,
    title: "01. THE DEMISE OF BOILERPLATE",
    imageUrl: "https://picsum.photos/seed/code/800/400?grayscale&blur=1",
    content: [
      "The Java ecosystem is legendary for its enterprise-scale stability, but equally infamous for its 'ceremony': the excessive amount of repetitive code required for even the simplest tasks. Getters, setters, verbose XML configurations, and redundant DTOs have long been the tax paid for robustness.",
      "Until now.",
      "Generative AI does not arrive to replace the Java developer; it arrives to liberate them. Envision AI as a 'Cognitive Exoskeleton'. You, the developer, remain in command of the architecture, but the AI lifts the heavy burden of routine coding."
    ],
    bulletPoints: [
      "**Reduced Manual Labor:** Automate up to 40% of repetitive tasks.",
      "**Business Focus:** Reclaim hours lost to configuration and invest them in solving real-world problems.",
      "**Velocity:** Accelerate from concept to deployment in record time."
    ],
    links: [
      { title: "Project Lombok", url: "https://projectlombok.org/", type: "TOOL" },
      { title: "Java Records Guide", url: "https://docs.oracle.com/en/java/javase/17/language/records.html", type: "DOCS" }
    ],
    cta: "AI won't take your job. A Java developer who masters AI will replace one who refuses to use it."
  },
  {
    id: 3,
    type: PageType.CONTENT,
    title: "02. THE FUTURE STACK",
    imageUrl: "https://picsum.photos/seed/structure/800/400?grayscale",
    content: [
      "To fully leverage Augmented Development, our foundation must be modern, modular, and resilient. This suggested stack prepares your team for the next generation of enterprise Java applications."
    ],
    bulletPoints: [
      "**Core Foundation:** Spring Boot 4.x with Java 25 (Preview).",
      "**Data & Security:** Spring Data JPA, Spring Security with JWT.",
      "**Efficiency Tools:** MapStruct (DTO mapping), Lombok (Boilerplate reduction).",
      "**Quality Assurance:** JUnit 5, Mockito, TestContainers.",
      "**Docs & Observability:** OpenAPI (Swagger), Micrometer + Prometheus.",
      "**Resilience & Migration:** Resilience4j, Flyway.",
      "**Code Style:** Tactical DDD, Hexagonal Architecture, Records for DTOs, Sealed Classes."
    ],
    links: [
      { title: "Spring Boot Documentation", url: "https://spring.io/projects/spring-boot", type: "DOCS" },
      { title: "TestContainers", url: "https://testcontainers.com/", type: "TOOL" },
      { title: "Resilience4j", url: "https://resilience4j.readme.io/", type: "DOCS" },
      { title: "MapStruct", url: "https://mapstruct.org/", type: "TOOL" }
    ]
  },
  {
    id: 4,
    type: PageType.CONTENT,
    title: "03. TEAM-CUSTOMIZED PROMPTS",
    imageUrl: "https://picsum.photos/seed/neural/800/400?grayscale",
    content: [
      "Consistency is key. Use these standardized prompts to guide the AI, ensuring uniform output across your entire development team."
    ],
    codeSnippets: [
      {
        language: "text",
        caption: "1. Repository Generation",
        code: `Create a JPA repository for the User entity that allows searching for active users with the ADMIN role, sorted in descending order by last activity date.`
      },
      {
        language: "text",
        caption: "2. Test Generation",
        code: `Generate a test using JUnit 5 and Mockito to validate that the updateUser method throws a UserNotFoundException if the ID does not exist.`
      },
      {
        language: "text",
        caption: "3. Legacy Refactoring",
        code: `Transform this for loop into an expression using Java Streams that filters active users and returns their email addresses.`
      },
      {
        language: "text",
        caption: "4. Documentation",
        code: `Generate Javadoc for the calculateDiscount method, explaining its parameters, return value, and edge cases.`
      },
      {
        language: "text",
        caption: "5. Security Audit",
        code: `Identify potential vulnerabilities in this REST controller that receives user data and stores it in a database.`
      },
      {
        language: "text",
        caption: "6. Architecture Design",
        code: `Suggest a package structure for a Java application based on microservices with a DDD approach and hexagonal architecture.`
      }
    ],
    links: [
      { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "ARTICLE" },
      { title: "Google Gemini API Docs", url: "https://ai.google.dev/gemini-api/docs", type: "DOCS" }
    ]
  },
  {
    id: 5,
    type: PageType.CONTENT,
    title: "04. FROM INTENT TO IMPLEMENTATION",
    imageUrl: "https://picsum.photos/seed/keyboard/800/400?grayscale&blur=2",
    content: [
      "The magic happens when your natural language translates directly into modern, optimized Java code."
    ],
    codeSnippets: [
      {
        language: "java",
        caption: "A. Complex Queries (Spring Data JPA)",
        code: `// Prompt: "Create a query for 'PREMIUM' users registered 30 days ago with purchases > $100."

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.registrationDate >= :startDate AND u.status = 'PREMIUM' AND u.lastPurchaseAmount > :minAmount")
    Page<User> findPremiumUsers(@Param("startDate") LocalDate date, @Param("minAmount") BigDecimal amount, Pageable pageable);
}`
      },
      {
        language: "java",
        caption: "B. Unit Testing (JUnit 5)",
        code: `// Prompt: "Generate a test for when a user is not found during update."

@Test
void updateNonExistentUserThrowsException() {
    when(userRepository.findById(99L)).thenReturn(Optional.empty());
    assertThrows(UserNotFoundException.class, () -> {
        userService.updateUser(99L, dto);
    });
}`
      }
    ],
    links: [
      { title: "Spring Data JPA Reference", url: "https://docs.spring.io/spring-data/jpa/reference/", type: "DOCS" },
      { title: "JUnit 5 User Guide", url: "https://junit.org/junit5/docs/current/user-guide/", type: "DOCS" },
      { title: "Mockito Documentation", url: "https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html", type: "DOCS" }
    ]
  },
  {
    id: 6,
    type: PageType.CONTENT,
    title: "05. THE LEGACY RENAISSANCE",
    imageUrl: "https://picsum.photos/seed/bridge/800/400?grayscale",
    content: [
      "Maintaining legacy code is costly. AI acts as a Senior Consultant to modernize your applications instantly.",
      "**Intelligent Refactoring:** Transform archaic loops into modern Java Streams automatically."
    ],
    codeSnippets: [
      {
        language: "java",
        caption: "Legacy Loop (Before)",
        code: `for (User user : allUsers) {
    if (user.isActive()) { names.add(user.getName()); }
}`
      },
      {
        language: "java",
        caption: "AI Modernized Stream (After)",
        code: `List<String> names = allUsers.stream()
    .filter(User::isActive)
    .map(User::getName)
    .collect(Collectors.toList());`
      }
    ],
    bulletPoints: [
      "**Quality Shield:** Generate instant Javadocs for undocumented methods.",
      "**Security:** Detect vulnerabilities (like SQL injection risks) before compilation.",
      "**Standardization:** Enforce team coding standards across the entire codebase."
    ],
    links: [
      { title: "Java Stream API Docs", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/package-summary.html", type: "DOCS" },
      { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "ARTICLE" },
      { title: "Refactoring.guru", url: "https://refactoring.guru/", type: "ARTICLE" }
    ]
  },
  {
    id: 7,
    type: PageType.CONTENT,
    title: "06. AI AS AN ACCELERATOR",
    imageUrl: "https://picsum.photos/seed/rocket/800/400?grayscale",
    content: [
      "We must expand our objective. AI is not a crutch; it is a turbocharger for your development lifecycle."
    ],
    bulletPoints: [
      "**What AI Does For You:** Automate repetitive code (DTOs, Mappers), suggest design patterns, safe refactoring, documentation generation, and error detection before compilation.",
      "**Your New Focus:** Designing business logic, defining use cases, ensuring scalable architecture (Hexagonal, Microservices), software quality (metrics, observability), and stakeholder communication."
    ],
    cta: "From coder to solution designer. You define the course; AI accelerates the journey.",
    links: [
      { title: "Vertex AI", url: "https://cloud.google.com/vertex-ai", type: "TOOL" },
      { title: "Domain Driven Design", url: "https://martinfowler.com/tags/domain%20driven%20design.html", type: "ARTICLE" }
    ]
  },
  {
    id: 8,
    type: PageType.CLOSING,
    title: "07. THE ARCHITECT'S HORIZON",
    imageUrl: "https://picsum.photos/seed/horizon/800/800?grayscale",
    content: [
      "The role of the developer is evolving to a higher level of abstraction. Value no longer lies in memorizing syntax, but in designing resilient, scalable systems."
    ],
    bulletPoints: [
      "**Integrate AI Today:** Use GitHub Copilot or Gemini in your IDE.",
      "**Supervise, Don't Copy:** Cultivate critical thinking; you are the expert validator.",
      "**Design First:** Focus on Hexagonal Architecture and Microservices patterns."
    ],
    cta: "Generative AI is the fuel. You are the engine. Are you ready to evolve?",
    links: [
      { title: "Microservices.io", url: "https://microservices.io/", type: "ARTICLE" },
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "ARTICLE" },
      { title: "Hexagonal Architecture", url: "https://alistair.cockburn.us/hexagonal-architecture/", type: "ARTICLE" }
    ]
  }
];
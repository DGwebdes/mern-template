User
├── owns → Teams
├── member of → Teams (with roles)
├── assigned to → Tasks
└── creates → Comments

Team
├── has many → Members (Users)
├── has many → Projects
└── owned by → User

Project
├── belongs to → Team
├── has many → Members (subset of team)
└── has many → Tasks

Task
├── belongs to → Project
├── assigned to → Users
├── has many → Comments
├── has many → Attachments
└── generates → ActivityLogs

Comment
├── belongs to → Task
└── created by → User

ActivityLog
├── tracks actions on → Task/Project/Team
└── performed by → User


# Project 1 - Task Management
MONGO_URI="mongodb+srv://user:pass@cluster0.mongodb.net/task-management-dev"

# Project 2 - E-commerce
MONGO_URI="mongodb+srv://user:pass@cluster0.mongodb.net/ecommerce-dev"

# Project 3 - Blog
MONGO_URI="mongodb+srv://user:pass@cluster0.mongodb.net/blog-dev"
```

**Same cluster (`cluster0`), three different databases!**

Each database is isolated - they don't see each other's data.

---

## 🏢 Visual Representation
```
Cluster0 (cluster0.odkqody.mongodb.net)
├── task-management-dev (Database)
│   ├── users (Collection)
│   │   ├── { _id: 1, name: "Alice" } (Document)
│   │   └── { _id: 2, name: "Bob" } (Document)
│   ├── tasks (Collection)
│   │   └── { _id: 1, title: "Build API" } (Document)
│   └── teams (Collection)
│
├── ecommerce-dev (Database)
│   ├── products (Collection)
│   └── orders (Collection)
│
└── blog-dev (Database)
    ├── posts (Collection)
    └── comments (Collection)
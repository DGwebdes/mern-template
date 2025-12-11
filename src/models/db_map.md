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

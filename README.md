## usersテーブル

|Column|Type|Option|
|------|----|------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many : posts
- has_many : users_groups
- has_many : groups, throught: :users_groups


## groupsテーブル

|Column|Type|Option|
|------|----|------|
|groupname|string|null: false|
|member|string||null: false|

### Association
- has_many :posts
- has_many :users_groups
- has_many :users, thought: :users_groups


## users_groupsテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## postsグループ

|Column|Type|Option|
|------|----|------|
|text|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Assosiation
- belongs_to :user
- belongs_to :group


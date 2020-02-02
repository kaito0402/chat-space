## usersテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many : posts
- has_many : users_groups
- has_many : groups, through: :users_groups


## groupsテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false|

### Association
- has_many :posts
- has_many :users_groups
- has_many :users, though: :users_groups


## users_groupsテーブル

|Column|Type|Option|
|------|----|------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## postsグループ

|Column|Type|Option|
|------|----|------|
|text|text|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Assosiation
- belongs_to :user
- belongs_to :group


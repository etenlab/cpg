
-- GRAPH ------------------------------------------------------------

create table node_types (
  type_name varchar(32) primary key
);

create table nodes (
  node_id bigserial primary key,
  node_type varchar(32) references node_types(type_name)
);

create table node_property_keys (
  node_property_key_id bigserial primary key,
  node_id bigint references nodes(node_id) not null,
  property_key varchar(64)
);

create index idx_node_property_keys_node_id_key on node_property_keys (node_id);

create table node_property_values (
  node_property_value_id bigserial primary key,
  node_property_key_id bigint references node_property_keys(node_property_key_id) not null,
  property_value jsonb
);

create index idx_node_property_values_key_id on node_property_values (node_property_key_id);

create table relationship_types (
  type_name varchar(32) primary key
);

create table relationships (
  relationship_id bigserial primary key,
  relationship_type varchar(32) references relationship_types(type_name),
  from_node_id bigint references nodes(node_id),
  to_node_id bigint references nodes(node_id)
);

create index idx_relationships_from_node_id on relationships (from_node_id);
create index idx_relationships_to_node_id on relationships (to_node_id);

create table relationship_property_keys (
  relationship_property_key_id bigserial primary key,
  relationship_id bigint references relationships(relationship_id) not null,
  property_key varchar(64)
);

create index idx_relationship_property_keys_relationship_id on relationship_property_keys (relationship_id);

create table relationship_property_values (
  relationship_property_value_id bigserial primary key,
  relationship_property_key_id bigint references relationship_property_keys(relationship_property_key_id) not null,
  property_value jsonb
);

create index idx_relationship_property_values_key_id on relationship_property_values (relationship_property_key_id);

insert into node_types (type_name) values
  ('word'),
  ('addition'),
  ('word-sequence'),
  ('sentence'),
  ('verse'),
  ('paragraph'),
  ('chapter'),
  ('section'),
  ('book'),
  ('bible'),

  ('definition'),
  ('article'),
  ('lexical-entry'),
  ('strongs-entry');

insert into relationship_types (type_name) values
  ('word-sequence-to-word'),
  ('verse-to-word-sequence'),
  ('sentence-to-word-sequence'),
  ('chapter-to-verse'),
  ('book-to-chapter'),
  ('chapter-to-section'),
  ('chapter-to-paragraph'),
  ('bible-to-book'),
  
  ('word-to-article'),

  ('word-to-strongs-entry'),
  ('word-to-addition'),
  ('section-to-paragraph'),
  ('section-to-section'),
  ('article-to-section'),
  ('article-to-paragraph'),
  ('article-to-sentence'),
  ('paragraph-to-sentence'),
  ('paragraph-to-verse'),
  ('verse-to-sentence'),
  ('sentence-to-word');

-- voting ---------------------------------------------------
create table votables(
  table_name varchar(64) not null unique
);

create table elections (
  id bigserial primary key,
  app_id bigint not null, -- todo, references app
  name varchar(128) not null,
  table_name varchar(64) not null references votables(table_name),
  row bigint not null,
  created_by varchar(512), -- placeholder, not sure how to reference users yet
  unique (app_id, name)
);

create table ballot_entries (
  id bigserial primary key,
  election_id bigint not null references elections(id),
  table_name varchar(64) not null references votables(table_name),
  row bigint not null,
  created_by varchar(512) -- placeholder, not sure how to reference users yet
);

create table votes (
  id bigserial primary key,
  user_id varchar(512),
  ballot_entry_id bigint not null references ballot_entries(id),
  up bool not null, -- true = up vote, false = down vote, delete record to remove vote from user
  unique (user_id, ballot_entry_id)
);

-- discussion ---------------------------------------------------
create table discussions (
  id bigserial primary key,
  app bigint not null references app_list(id),
  org bigint not null references organizations(id),
  table_name varchar(64) not null,
  row bigint not null
);

create table posts (
  id bigserial primary key,
  discussion_id bigint references discussions(id),
  user_id bigint not null references users(user_id), 
  -- prolly will change, not sure how we will reference users yet
  quill_text text,
  plain_text text,
  postgres_language regconfig not null default 'simple',
  search_text tsvector generated always as (
  		to_tsvector(
   			postgres_language,
  			plain_text
  		)
  ) stored,
  is_edited bool not null default false,
  reply_id bigint references posts(id),
  created_at timestamp default current_timestamp
);

create index posts_search_gin on posts using gin (search_text);

create table reactions (
  id bigserial primary key,
  user_id bigint not null references users(user_id), 
  -- will change, we use sso to track users
  post_id bigint not null references posts(id),
  content varchar(64) not null,
  unique (user_id, content, post_id)
);

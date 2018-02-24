import Fuse from 'fuse.js'
const fuseOptions = {
  id: 'id',
  keys: ['name', 'description', 'owner', 'creator'],
}

let fuse

function find(q) {
  return fuse.search(q)
}

function load(items) {
  fuse = new Fuse(
    items.map(x => ({
      id: x._id,
      name: x.name,
      description: x.description,
      owner: x.owner.name,
      creator: x.creator.name,
    })),
    fuseOptions
  )
}

export default { load, find }

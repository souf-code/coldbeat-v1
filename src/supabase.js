import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Column types
export const COLUMN_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  DATE: 'date',
  CHECKBOX: 'checkbox'
}

// Column management functions
export const getColumns = async (teamSpace) => {
  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('team_space', teamSpace)
    .order('position')
  
  if (error) throw error
  return data
}

export const addColumn = async (teamSpace, column) => {
  const { data, error } = await supabase
    .from('columns')
    .insert([
      {
        team_space: teamSpace,
        name: column.name,
        type: column.type,
        position: column.position,
        options: column.options || null
      }
    ])
    .select()
  
  if (error) throw error
  return data[0]
}

export const updateColumn = async (columnId, updates) => {
  const { data, error } = await supabase
    .from('columns')
    .update(updates)
    .eq('id', columnId)
    .select()
  
  if (error) throw error
  return data[0]
}

export const deleteColumn = async (columnId) => {
  const { error } = await supabase
    .from('columns')
    .delete()
    .eq('id', columnId)
  
  if (error) throw error
}

// Row management functions
export const getRows = async (teamSpace) => {
  const { data, error } = await supabase
    .from('rows')
    .select('*')
    .eq('team_space', teamSpace)
    .order('created_at')
  
  if (error) throw error
  return data
}

export const addRow = async (teamSpace, values) => {
  const { data, error } = await supabase
    .from('rows')
    .insert([
      {
        team_space: teamSpace,
        values: values
      }
    ])
    .select()
  
  if (error) throw error
  return data[0]
}

export const updateRow = async (rowId, values) => {
  const { data, error } = await supabase
    .from('rows')
    .update({ values })
    .eq('id', rowId)
    .select()
  
  if (error) throw error
  return data[0]
}

export const deleteRow = async (rowId) => {
  const { error } = await supabase
    .from('rows')
    .delete()
    .eq('id', rowId)
  
  if (error) throw error
} 
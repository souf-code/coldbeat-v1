import { createClient } from '@supabase/supabase-js'

console.log("🔥 Supabase client loaded — version: 2")

// TEMP: Hardcoded values for debugging
const supabaseUrl = 'https://ogkqofwdholrhfldhpfn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9na3FvZndkaG9scmhmbGRocGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA4NjYsImV4cCI6MjA2NTE1Njg2Nn0.MVbuKEz5JgDowbI27J7zTlevzpCAogHWjXAcZD7ayng'

console.log("HARD TEST: URL = ", supabaseUrl)
console.log("HARD TEST: KEY = ", supabaseAnonKey)

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('columns').select('count').limit(1)
    if (error) throw error
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection failed:', error)
    return false
  }
}

// Export the client
export { supabase }

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
  try {
    const { data, error } = await supabase
      .from('columns')
      .select('*')
      .eq('team_space', teamSpace)
      .order('position')
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching columns:', error)
    return []
  }
}

export const addColumn = async (teamSpace, column) => {
  try {
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
  } catch (error) {
    console.error('Error adding column:', error)
    throw error
  }
}

export const updateColumn = async (columnId, updates) => {
  try {
    const { data, error } = await supabase
      .from('columns')
      .update(updates)
      .eq('id', columnId)
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error updating column:', error)
    throw error
  }
}

export const deleteColumn = async (columnId) => {
  try {
    const { error } = await supabase
      .from('columns')
      .delete()
      .eq('id', columnId)
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting column:', error)
    throw error
  }
}

// Row management functions
export const getRows = async (teamSpace) => {
  try {
    const { data, error } = await supabase
      .from('rows')
      .select('*')
      .eq('team_space', teamSpace)
      .order('created_at')
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching rows:', error)
    return []
  }
}

export const addRow = async (teamSpace, values) => {
  try {
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
  } catch (error) {
    console.error('Error adding row:', error)
    throw error
  }
}

export const updateRow = async (rowId, values) => {
  try {
    const { data, error } = await supabase
      .from('rows')
      .update({ values })
      .eq('id', rowId)
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error updating row:', error)
    throw error
  }
}

export const deleteRow = async (rowId) => {
  try {
    const { error } = await supabase
      .from('rows')
      .delete()
      .eq('id', rowId)
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting row:', error)
    throw error
  }
} 
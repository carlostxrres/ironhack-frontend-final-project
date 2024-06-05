const formConditions = [
  {
    conditionName: 'Email should have at least one character',
    invalidMessage: 'Please enter your email address',
    fieldName: 'email',
    condition: (fieldValue) => fieldValue.trim().length > 0
  },
  // The email validation conditions can be improved. For more
  // details, see https://en.wikipedia.org/wiki/Email_address#Syntax
  {
    conditionName: 'Email should start with a set of letters, numbers, dots, or hyphens',
    invalidMessage: 'Please enter a valid email username',
    fieldName: 'email',
    condition: (fieldValue) => {
      const emailUsernameRegex = /^[\w-.]+/
      return emailUsernameRegex.test(fieldValue.trim())
    }
  },
  {
    conditionName: 'Email should include a @ symbol',
    invalidMessage: 'Please include a @ symbol',
    fieldName: 'email',
    condition: (fieldValue) => fieldValue.includes('@')
  },
  {
    conditionName: 'Email should end with a valid domain name',
    invalidMessage: 'Please enter a valid email domain',
    fieldName: 'email',
    condition: (fieldValue) => {
      const domainRegex = /([\w-]+\.)+[\w-]{2,4}$/
      return domainRegex.test(fieldValue.trim())
    }
  },
  {
    conditionName: 'Password should have at least 8 characters',
    invalidMessage: 'Please enter a password with at least 8 characters',
    fieldName: 'password',
    condition: (fieldValue) => fieldValue.trim().length >= 8
  },
  {
    conditionName: 'Passwords should match',
    invalidMessage: 'Passwords do not match',
    fieldName: 'password-confirm',
    condition: (fieldValue) => {
      const form = document.querySelector('form')
      const passwordValue = form.querySelector('input[name="password"]').value
      return passwordValue === fieldValue
    }
  },
  {
    conditionName: 'You must accept the terms',
    invalidMessage: 'Please accept the terms',
    fieldName: 'accepts-terms',
    condition: (fieldValue) => {
      console.log('fieldValue: ', fieldValue)
      return fieldValue === 'on'
    }
  }
]

export const validateForm = (formData) => {
  const validationResults = formConditions.map((formCondition) => {
    const fieldValue = formData.get(formCondition.fieldName)
    const meets = formCondition.condition(fieldValue)
    return { ...formCondition, meets }
  })

  const areAllValid = validationResults.every((validation) => validation.meets)
  return { areAllValid, validationResults }
}

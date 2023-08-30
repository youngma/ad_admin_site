import variables from '@/styles/variables.module.scss'

export const useDesign = () => {
  const lessVariables = variables

  /**
   * @param scope
   * @returns string
   */
  const getPrefixCls = (scope) => {
    return `el-${scope}`
  }

  return {
    variables: lessVariables,
    getPrefixCls
  }
}

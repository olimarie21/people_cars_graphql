const getStyles = () => ({
    header: {
      fontSize: 50,
      padding: '15px',
      marginBottom: '50px'
    }
  })
  
  const Header  = () => {
    const styles = getStyles()
  
    return <h1 style={styles.header}>People &amp; their Cars</h1>
  }
  
  export default Header
  
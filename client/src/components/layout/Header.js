const getStyles = () => ({
    header: {
      fontSize: 45,
      padding: '15px',
      marginBottom: '20px',
      textTransform: 'uppercase',
    }
  })
  
  const Header  = () => {
    const styles = getStyles()
  
    return <h1 style={styles.header}>People &amp; their Cars</h1>
  }
  
  export default Header
  
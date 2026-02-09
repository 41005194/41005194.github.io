document.addEventListener('DOMContentLoaded', async function(){
  // Active link highlight
  const path = location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('.main-nav a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active')
  })
  
  // Load and display files
  const rubricMap = {
    'travaux.html': 'travaux',
    'supports.html': 'supports',
    'certifications.html': 'certifications',
    'projet.html': 'projet',
    'diaporama.html': 'diaporama',
    'ressources.html': 'ressources'
  }
  
  if(rubricMap[path]){
    try {
      const res = await fetch('data/portfolio.json')
      const data = await res.json()
      const rubric = rubricMap[path]
      const files = data[rubric] || []
      const container = document.getElementById('files-list')
      
      if(container){
        if(files.length === 0){
          container.innerHTML = '<p style="color: var(--muted);">Aucun fichier pour cette section.</p>'
        } else {
          let html = '<table style="width:100%;border-collapse:collapse;">'
          html += '<tr style="border-bottom:1px solid rgba(255,255,255,0.1);"><th style="text-align:left;padding:8px;">Fichier</th><th style="text-align:left;padding:8px;">Date</th></tr>'
          files.forEach(f => {
            html += `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;"><a href="${f.url}" style="color:var(--accent);text-decoration:none;">${f.name}</a></td><td style="padding:8px;color:var(--muted);white-space:nowrap;">${f.date}</td></tr>`
          })
          html += '</table>'
          container.innerHTML = html
        }
      }
    } catch(e) {
      console.log('Could not load portfolio data:', e)
    }
  }
})

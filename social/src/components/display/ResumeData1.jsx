import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import "../css/display/ResumeData1.css"
import { Editor } from '@tinymce/tinymce-react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 

const ResumeData1 = () => {
  const [resumeData, setResumeData] = useState(null);
  const { id } = useParams();
  const editorRef = useRef(null);
  const resumeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
  
        const response = await fetch(`http://localhost:5000/form-submissions/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setResumeData(data);
          console.log(data);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    
  };
  const displayEducation = (educations) => (
    <div>
      {educations && educations.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '2px' }} className="resume-section">Education</h2>
          <hr className="hrdiv" />
          {educations.map((education, index) => (
            <div key={index} className="resume-education">
              <h4 style={{ margin: '6px' }}>{education.degree}</h4>
              <h5 style={{ color: '#3a788b', margin: '6px' }}>{education.school}</h5>
              <h5 style={{ margin: '6px' }}>
                &#128198;{education.fromYear} - {education.toYear}
              </h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const displayWorkExperience = (workExperiences) => (
    <div>
      {workExperiences && workExperiences.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '2px' }} className="resume-section">Work Experience</h2>
          <hr className="hrdiv" />
          {workExperiences.map((experience, index) => (
            <div key={index} className="resume-work-experience">
              <h4 style={{ margin: '6px' }}>{experience.position}</h4>
              <h4 style={{ color: '#3a788b', margin: '6px' }}>{experience.company}</h4>
              <h5 style={{ margin: '6px' }}>
                &#128198;{experience.fromYear} - {experience.toYear}
              </h5>
              <p style={{ margin: '6px' }}>{experience.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const displaySkills = (skills) => (
    <div>
      {skills && skills.length > 0 && (
        <div style={{ width: '100%' }}>
          <h2 style={{ marginBottom: '2px' }} className="resume-section">Skills</h2>
          <hr className="hrdiv" />
          <ul style={{ left: '0px', listStyleType: 'none', paddingLeft: '0', display: 'flex', gap: '10px', flexWrap: 'wrap', width: 'auto' }} className="resume-list" id="skill-list">
            {skills.map((skill, index) => (
              <li key={index} className="resume-item" style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)', padding: '5px', borderRadius: '5px' }}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
  const displayCertifications = (certifications) => (
    <div>
      {certifications && certifications.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '2px' }} className="resume-section">Certifications</h2>
          <hr className="hrdiv" />
          {certifications.map((certification, index) => (
            <div key={index}>
              <h4 style={{ color: '#3a788b', margin: '6px' }}>{certification.course}</h4>
              <p style={{ margin: '6px' }} className="resume-certification">{certification.institute}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const displayProjects = (projects) => (
    <div>
      {projects && projects.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '2px' }} className="resume-section">Projects</h2>
          <hr className="hrdiv" />
          {projects.map((project, index) => (
            <div style={{ borderBottom: '1px grey dashed' }} key={index}>
              <h4 style={{ marginBottom: '2px' }}>{project.name}</h4>
              &#128198; {project.date}&nbsp; &nbsp;
              &#8982; {project.location}
              <p className="resume-description">{project.description}</p>
              <p className="resume-hyperlink">
                <a style={{textDecoration:'none'}} href={project.hyperlink} target="_blank" rel="noopener noreferrer">
                  {project.hyperlink}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <div>
     
      <div style={{ padding:'0px',scale:'1.4',display:'none',width:'21cm',minHeight:'2.97cm', margin:'auto auto' }} className="resume-container" ref={resumeRef}>
        {/* Render resumeData */}
        {resumeData && (
          
          <div >
             <header style={{backgroundColor:'#3a788b', width:'120%', height:'fit-content'}}>
             <div >
            <h1 style={{ color:'white',margin:'2px' }} className="resume-name">{resumeData.name}</h1>
            <h3 style={{ color:'white',margin:'2px' }}>The Role Applying For?</h3>
            
            
            </div></header>
            <hr style={{ width:'98%' }} />
            <div  id="basic-info">
              <div style={{ display:'flex',gap:'20px', width:'500px' }}>
              <p style={{ margin: '2px' }}className="resume-phone">
              &#9990; {resumeData.phone}
              </p>
              <p style={{ margin: '2px' }}className="resume-email">
              &#9993; {resumeData.email}
              </p></div>
              <div style={{display:'flex',flexDirection:'column',gap:'-30px', flexWrap:'wrap'}}>
              <p style={{ margin: '2px' }}className="resume-address">
              &#8982; {resumeData.Address}
              </p>
              <ul style={{ listStyleType: 'none',display: 'flex',flexWrap: 'wrap',left:'-30px',width:'1000px',margin: '2px'}}>
              {resumeData.Hyperlinks.map((linkObj, index) => (
                <li  key={index}>
                 &#128279;
                  <a style={{color:'#5f6cd0', textDecoration:'none'}} href={linkObj.link} className="resume-item" target="_blank" rel="noopener noreferrer">
                    {linkObj.link}
                  </a>
                </li>
              ))}</ul></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
  
  <div style={{ display: 'flex', gap: '20px' }}>
  
    <div style={{width:'60%'}}id="coldiv1">
    <div id="summary-div" style={{ marginBottom: '20px' }}>
    <h2 style={{marginBottom:'2px'}}>Summary</h2>
    <hr className="hrdiv" />
    <p className="resume-summary">{resumeData.summary}</p>
  </div>
  {resumeData && displayWorkExperience(resumeData.workExperiences)}
      
      {resumeData && displayProjects(resumeData.projects)}
    </div>
    <div style={{width:'35%'}}id="coldiv2">
    {resumeData && displayEducation(resumeData.educations)}
      {resumeData && displaySkills(resumeData.skills)}
      {resumeData && displayCertifications(resumeData.certifications)}
    </div>
  </div>
</div>
          </div>
        )}
      </div>
      
      <div>
       
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh',flexWrap:'wrap' }}>
        <Editor
          apiKey="51j5rfcrw1c3709s0ekcf5mjzip8rg93ja5f4nh4l7z56fak" // Replace with your TinyMCE API key
          initialValue={resumeRef.current?.innerHTML || ''}
          id="basic-conf"
          init={{
            width: 1000,
            height: 1500,
            toolbar_mode: 'wrap',
            plugins: [
              'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
              'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
              'table', 'emoticons', 'template', 'help'
            ],
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
              'forecolor backcolor emoticons | help',
            menu: {
              favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
            },
            menubar: 'favs file edit view insert format tools table help',
            content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 16px }',
            setup: (editor) => {
              editorRef.current = editor;
              editor.on('change', () => {
                handleEditorChange(editor.getContent(), editor);
              });
            }
          }}
        />
      </div>
       
        {/* <button onClick={downloadAsPdf}>Download as PDF</button> */}
      </div>
    </div>
  );
};

export default ResumeData1;

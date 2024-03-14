import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/Form/ResumeForm.css'
import Navbar from '../Navbar/Navbar';

const ResumeForm = () => {
const navigate =useNavigate();





const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  Address: '',
  Hyperlinks: [''],
  summary: '',
  workExperiences: [{ company: '', position: '', fromYear: '', toYear: '', description: '' }],
  educations: [{ degree: '', school: '', fromYear: '', toYear: '' }],
  skills: [''],
  certifications: [{ course: '', institute: '' }],
  projects: [{ name: '', date: '', location: '', description: '', hyperlink: '' }],
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddItem = (itemType) => {
    setFormData((prevData) => ({ ...prevData, [itemType]: [...prevData[itemType], ''] }));
  };

  const handleItemChange = (itemType, index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [itemType]: prevData[itemType].map((item, i) => (i === index ? value : item)),
    }));
  };
  

  const handleDeleteItem = (itemType, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [itemType]: prevData[itemType].filter((_, i) => i !== index),
    }));
  };




  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      

      const response = await axios.post('http://localhost:5000/form-submissions', formData, {
        headers: {
          'Content-Type': 'application/json',
          // Include your authentication token if needed
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        console.log('Form Submission Success');
        console.log(response.data);
        navigate('/entries')
      } else {
        console.log('Form Submission Failed. Status: ', response.status);
      }
    } catch (error) {
      console.error('Error creating form submission:', error);
      // Handle errors
    }
  };



  return (
    <div>
      <Navbar/>
      <form id="entry-form" onSubmit={handleSubmit}>
        
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />


          {/* Example: Phone */}
          <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <br />

        {/* Example: Email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />

        {/* Example: Address */}
        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          id="Address"
          name="Address"
          value={formData.Address}
          onChange={handleInputChange}
        />
        <br />

        <div id="HyperLinkField">
          <label>Hyper-Links:</label>
          {formData.Hyperlinks.map((linkObj, index) => (
            <div key={index} className="HyperLink-entry">
              <input
                type="url"
                name={`Hyperlinks[${index}].link`}
                placeholder="Hyper-Link"
                value={linkObj.link}
                onChange={(e) => handleItemChange('Hyperlinks', index, { link: e.target.value })}
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('Hyperlinks')}>
            Add Hyper-Link
          </button>
        </div>
        <br />
  
        {/* ... (Repeat the above pattern for other dynamic fields like summary, education, skills, certifications, projects) */}
  
        <label htmlFor="summary">Summary:</label>
        <textarea id="summary" name="summary" value={formData.summary} onChange={handleInputChange} />
        <br />
          
        <div id="workExperienceFields">
  <label>Work Experience:</label>
  {formData.workExperiences.map((experience, index) => (
    <div key={index} className="work-experience-entry">
      <input
        type="text"
        name={`workExperiences[${index}][company]`}
        placeholder="Company"
        value={experience.company}
        onChange={(e) =>
          handleItemChange('workExperiences', index, { ...experience, company: e.target.value })
        }
      />
      <input
        type="text"
        name={`workExperiences[${index}][position]`}
        placeholder="Position"
        value={experience.position}
        onChange={(e) =>
          handleItemChange('workExperiences', index, { ...experience, position: e.target.value })
        }
      />
      <label>From Year:</label>
      <input
        type="number"
        name={`workExperiences[${index}][fromYear]`}
        placeholder="From Year"
        min="1900"
        max="2100"
        value={experience.fromYear}
        onChange={(e) =>
          handleItemChange('workExperiences', index, { ...experience, fromYear: e.target.value })
        }
      />
      <label>To Year:</label>
      <input
        type="number"
        name={`workExperiences[${index}][toYear]`}
        placeholder="To Year"
        min="1900"
        max="2100"
        value={experience.toYear}
        onChange={(e) =>
          handleItemChange('workExperiences', index, { ...experience, toYear: e.target.value })
        }
      />
      <textarea
        name={`workExperiences[${index}][description]`}
        placeholder="Description"
        value={experience.description}
        onChange={(e) =>
          handleItemChange('workExperiences', index, { ...experience, description: e.target.value })
        }
      />
      <button type="button" onClick={() => handleDeleteItem('workExperiences', index)}>
        Delete
      </button>
    </div>
  ))}
  <button type="button" onClick={() => handleAddItem('workExperiences')}>
    Add Work Experience
  </button>
</div>
        <div id="educationFields">
          <label>Education:</label>
          {formData.educations.map((education, index) => (
            <div key={index} className="education-entry">
              <input
                type="text"
                name={`educations[${index}][degree]`}
                placeholder="Degree"
                value={education.degree}
                onChange={(e) =>
                  handleItemChange('educations', index, { ...education, degree: e.target.value })
                }
              />
              <input
                type="text"
                name={`educations[${index}][school]`}
                placeholder="School"
                value={education.school}
                onChange={(e) =>
                  handleItemChange('educations', index, { ...education, school: e.target.value })
                }
              />
              <label>From Year:</label>
              <input
                type="number"
                name={`educations[${index}][fromYear]`}
                placeholder="From Year"
                min="1900"
                max="2100"
                value={education.fromYear}
                onChange={(e) =>
                  handleItemChange('educations', index, { ...education, fromYear: e.target.value })
                }
              />
              <label>To Year:</label>
              <input
                type="number"
                name={`educations[${index}][toYear]`}
                placeholder="To Year"
                min="1900"
                max="2100"
                value={education.toYear}
                onChange={(e) =>
                  handleItemChange('educations', index, { ...education, toYear: e.target.value })
                }
              />
              <button type="button" onClick={() => handleDeleteItem('educations', index)}>
        Delete
      </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('educations')}>
            Add Education
          </button>
        </div>
  
        {/* Example: Skills */}
        <div id="skillField">
          <label htmlFor="cscs">Skills:</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="skills-entry">
              <input
                type="text"
                name={`skills[${index}]`}
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleItemChange('skills', index, e.target.value)}
              />
             <button type="button" onClick={() => handleDeleteItem('skills', index)}>
        Delete
      </button>
            </div>
            
          ))}
          <button type="button" onClick={() => handleAddItem('skills')}>
            Add Skill
          </button>
          
        </div>
  
        {/* ... (Repeat the above pattern for other dynamic fields like certifications, projects) */}
  
        <div id="certificationFields">
          <label htmlFor="certifications">Certifications:</label>
          {formData.certifications.map((certification, index) => (
            <div key={index} className="certifications-entry">
              <input
                type="text"
                name={`certifications[${index}][course]`}
                placeholder="Course"
                value={certification.course}
                onChange={(e) =>
                  handleItemChange('certifications', index, {
                    ...certification,
                    course: e.target.value,
                  })
                }
              />
              <input
                type="text"
                name={`certifications[${index}][institute]`}
                placeholder="Institute"
                value={certification.institute}
                onChange={(e) =>
                  handleItemChange('certifications', index, {
                    ...certification,
                    institute: e.target.value,
                  })
                }
              />
              <button type="button" onClick={() => handleDeleteItem('certifications', index)}>
        Delete
      </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('certifications')}>
            Add Certification
          </button>
        </div>
  
        {/* Example: Projects */}
        <div id="projectField">
          <label htmlFor="projects">Projects:</label>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-entry">
              <input
                type="text"
                name={`projects[${index}][name]`}
                placeholder="Project Name"
                value={project.name}
                onChange={(e) =>
                  handleItemChange('projects', index, { ...project, name: e.target.value })
                }
              />
              <input
                type="month"
                name={`projects[${index}][date]`}
                placeholder="Project Date"
                value={project.date}
                onChange={(e) =>
                  handleItemChange('projects', index, { ...project, date: e.target.value })
                }
              />
              <input
                type="text"
                name={`projects[${index}][location]`}
                placeholder="Project Location"
                value={project.location}
                onChange={(e) =>
                  handleItemChange('projects', index, { ...project, location: e.target.value })
                }
              />
              <textarea
                name={`projects[${index}][description]`}
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  handleItemChange('projects', index, { ...project, description: e.target.value })
                }
              ></textarea>
              <input
                type="url"
                name={`projects[${index}][hyperlink]`}
                placeholder="Project Hyperlink"
                value={project.hyperlink}
                onChange={(e) =>
                  handleItemChange('projects', index, { ...project, hyperlink: e.target.value })
                }
              />
              <button type="button" onClick={() => handleDeleteItem('projects', index)}>
        Delete
      </button>
            </div>
))}
        <button type="button" onClick={() => handleAddItem('projects')}>
          Add Project
        </button>
      </div>

        <button id="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResumeForm;

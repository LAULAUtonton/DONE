"""
Backend tests for Day 1 guiding questions and Teacher Panel grading functionality
Tests: Day1Data model with guiding_question_1/2/3 fields, GradingData model, /groups/{id}/grading endpoint
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAPIHealth:
    """Basic API health checks"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root: {data['message']}")


class TestDay1GuidingQuestions:
    """Tests for Day 1 guiding questions feature"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Create a test group for Day 1 tests"""
        self.group_name = f"TEST_Day1_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/groups", json={
            "group_name": self.group_name,
            "members": ["Student1", "Student2", "Student3"],
            "project_type": "podcast"
        })
        assert response.status_code == 200
        self.group_id = response.json()["id"]
        print(f"✓ Created test group: {self.group_name}")
        yield
        # Cleanup
        requests.delete(f"{BASE_URL}/api/groups/{self.group_id}")
        print(f"✓ Cleaned up test group: {self.group_name}")
    
    def test_day1_guiding_questions_save(self):
        """Test saving Day 1 with guiding questions"""
        day1_data = {
            "topic": "Climate Change",
            "why_this_topic": "It affects everyone on Earth",
            "guiding_question_1": "How many people are affected by climate change?",
            "guiding_question_2": "What causes climate change?",
            "guiding_question_3": "What can young people do to help?",
            "completed": False
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/day", json={
            "day": 1,
            "data": day1_data
        })
        assert response.status_code == 200
        print("✓ Day 1 data saved successfully")
        
        # Verify data was persisted
        get_response = requests.get(f"{BASE_URL}/api/groups/{self.group_id}")
        assert get_response.status_code == 200
        group = get_response.json()
        
        assert group["day1"]["topic"] == "Climate Change"
        assert group["day1"]["why_this_topic"] == "It affects everyone on Earth"
        assert group["day1"]["guiding_question_1"] == "How many people are affected by climate change?"
        assert group["day1"]["guiding_question_2"] == "What causes climate change?"
        assert group["day1"]["guiding_question_3"] == "What can young people do to help?"
        print("✓ Day 1 guiding questions verified in database")
    
    def test_day1_partial_guiding_questions(self):
        """Test saving Day 1 with only some guiding questions filled"""
        day1_data = {
            "topic": "Poverty",
            "why_this_topic": "Many people suffer from poverty",
            "guiding_question_1": "How many people live in poverty?",
            "guiding_question_2": "",
            "guiding_question_3": "",
            "completed": False
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/day", json={
            "day": 1,
            "data": day1_data
        })
        assert response.status_code == 200
        
        # Verify partial data
        get_response = requests.get(f"{BASE_URL}/api/groups/{self.group_id}")
        group = get_response.json()
        
        assert group["day1"]["guiding_question_1"] == "How many people live in poverty?"
        assert group["day1"]["guiding_question_2"] == ""
        assert group["day1"]["guiding_question_3"] == ""
        print("✓ Partial guiding questions saved correctly")


class TestGradingRubric:
    """Tests for Teacher Panel grading functionality"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Create a test group for grading tests"""
        self.group_name = f"TEST_Grading_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/groups", json={
            "group_name": self.group_name,
            "members": ["Ana", "Luis", "Maria"],
            "project_type": "vlog"
        })
        assert response.status_code == 200
        self.group_id = response.json()["id"]
        print(f"✓ Created test group for grading: {self.group_name}")
        yield
        # Cleanup
        requests.delete(f"{BASE_URL}/api/groups/{self.group_id}")
        print(f"✓ Cleaned up test group: {self.group_name}")
    
    def test_grading_endpoint_exists(self):
        """Test that PUT /groups/{id}/grading endpoint exists"""
        grading_data = {
            "grading": {
                "structure": 3,
                "second_conditional": 3,
                "indefinite_pronouns": 3,
                "vocabulary": 3,
                "pronunciation": 3,
                "participation": 3,
                "comments": "Test comment"
            }
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/grading", json=grading_data)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Grading updated successfully"
        print("✓ Grading endpoint works correctly")
    
    def test_grading_all_criteria(self):
        """Test saving all 6 grading criteria (1-4 scale)"""
        grading_data = {
            "grading": {
                "structure": 4,
                "second_conditional": 3,
                "indefinite_pronouns": 4,
                "vocabulary": 3,
                "pronunciation": 2,
                "participation": 4,
                "comments": "Excellent structure and participation!"
            }
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/grading", json=grading_data)
        assert response.status_code == 200
        
        # Verify grading was persisted
        get_response = requests.get(f"{BASE_URL}/api/groups/{self.group_id}")
        assert get_response.status_code == 200
        group = get_response.json()
        
        assert group["grading"]["structure"] == 4
        assert group["grading"]["second_conditional"] == 3
        assert group["grading"]["indefinite_pronouns"] == 4
        assert group["grading"]["vocabulary"] == 3
        assert group["grading"]["pronunciation"] == 2
        assert group["grading"]["participation"] == 4
        assert group["grading"]["comments"] == "Excellent structure and participation!"
        print("✓ All 6 grading criteria saved and verified")
    
    def test_grading_score_calculation(self):
        """Test that scores can be summed correctly (sum/24 and percentage)"""
        grading_data = {
            "grading": {
                "structure": 4,
                "second_conditional": 4,
                "indefinite_pronouns": 4,
                "vocabulary": 4,
                "pronunciation": 4,
                "participation": 4,
                "comments": "Perfect score!"
            }
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/grading", json=grading_data)
        assert response.status_code == 200
        
        get_response = requests.get(f"{BASE_URL}/api/groups/{self.group_id}")
        group = get_response.json()
        
        # Calculate total
        total = (group["grading"]["structure"] + 
                 group["grading"]["second_conditional"] + 
                 group["grading"]["indefinite_pronouns"] + 
                 group["grading"]["vocabulary"] + 
                 group["grading"]["pronunciation"] + 
                 group["grading"]["participation"])
        
        assert total == 24
        percentage = round((total / 24) * 100)
        assert percentage == 100
        print(f"✓ Score calculation verified: {total}/24 = {percentage}%")
    
    def test_grading_comments_save(self):
        """Test that teacher comments field saves correctly"""
        long_comment = "Great work on the podcast! The structure was excellent with clear introduction, development, and conclusion. Second conditional sentences were used correctly. Good use of indefinite pronouns. Keep practicing pronunciation for next time."
        
        grading_data = {
            "grading": {
                "structure": 3,
                "second_conditional": 3,
                "indefinite_pronouns": 3,
                "vocabulary": 3,
                "pronunciation": 2,
                "participation": 3,
                "comments": long_comment
            }
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/grading", json=grading_data)
        assert response.status_code == 200
        
        get_response = requests.get(f"{BASE_URL}/api/groups/{self.group_id}")
        group = get_response.json()
        
        assert group["grading"]["comments"] == long_comment
        print("✓ Teacher comments saved correctly")
    
    def test_grading_update_existing(self):
        """Test updating existing grading data"""
        # First save
        grading_data1 = {
            "grading": {
                "structure": 2,
                "second_conditional": 2,
                "indefinite_pronouns": 2,
                "vocabulary": 2,
                "pronunciation": 2,
                "participation": 2,
                "comments": "Initial grade"
            }
        }
        
        response1 = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/grading", json=grading_data1)
        assert response1.status_code == 200
        
        # Update with new grades
        grading_data2 = {
            "grading": {
                "structure": 4,
                "second_conditional": 4,
                "indefinite_pronouns": 4,
                "vocabulary": 4,
                "pronunciation": 4,
                "participation": 4,
                "comments": "Updated grade after revision"
            }
        }
        
        response2 = requests.put(f"{BASE_URL}/api/groups/{self.group_id}/grading", json=grading_data2)
        assert response2.status_code == 200
        
        # Verify update
        get_response = requests.get(f"{BASE_URL}/api/groups/{self.group_id}")
        group = get_response.json()
        
        assert group["grading"]["structure"] == 4
        assert group["grading"]["comments"] == "Updated grade after revision"
        print("✓ Grading update works correctly")
    
    def test_grading_nonexistent_group(self):
        """Test grading endpoint with non-existent group"""
        fake_id = "nonexistent-group-id-12345"
        grading_data = {
            "grading": {
                "structure": 3,
                "second_conditional": 3,
                "indefinite_pronouns": 3,
                "vocabulary": 3,
                "pronunciation": 3,
                "participation": 3,
                "comments": "Test"
            }
        }
        
        response = requests.put(f"{BASE_URL}/api/groups/{fake_id}/grading", json=grading_data)
        assert response.status_code == 404
        print("✓ Non-existent group returns 404")


class TestTeacherLogin:
    """Tests for teacher authentication"""
    
    def test_teacher_login_correct_password(self):
        """Test teacher login with correct password"""
        response = requests.post(f"{BASE_URL}/api/teacher/login", json={
            "password": "profesor2024"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Teacher login with correct password works")
    
    def test_teacher_login_wrong_password(self):
        """Test teacher login with wrong password"""
        response = requests.post(f"{BASE_URL}/api/teacher/login", json={
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Teacher login with wrong password returns 401")


class TestGroupWithGrading:
    """Tests for group creation with default grading"""
    
    def test_new_group_has_default_grading(self):
        """Test that new groups have default grading structure"""
        group_name = f"TEST_DefaultGrading_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/groups", json={
            "group_name": group_name,
            "members": ["Test1", "Test2"],
            "project_type": "podcast"
        })
        assert response.status_code == 200
        group = response.json()
        
        # Check default grading structure exists
        assert "grading" in group
        assert group["grading"]["structure"] == 0
        assert group["grading"]["second_conditional"] == 0
        assert group["grading"]["indefinite_pronouns"] == 0
        assert group["grading"]["vocabulary"] == 0
        assert group["grading"]["pronunciation"] == 0
        assert group["grading"]["participation"] == 0
        assert group["grading"]["comments"] == ""
        print("✓ New group has default grading structure")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/groups/{group['id']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

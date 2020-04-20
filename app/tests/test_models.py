from django.test import TestCase
from app.models import Subject


class TestModels(TestCase):

    def test_subject_representation(self):
        subj = Subject(name="subject name")
        self.assertEquals(str(subj), subj.name)